import {
  Sequelize,
  DataType as SequelizeTypescriptDataType
} from "sequelize-typescript";
import * as path from "path";
import * as fs from "fs";
import * as inflection from "inflection";
import * as crypto from "crypto";
import * as beautify from "js-beautify";
import { createCommand } from "commander";
import { diff, Diff } from "deep-diff";
import {
  ModelCtor,
  Model,
  ModelAttributeColumnOptions,
  DataType,
  IndexesOptions,
  QueryInterface
} from "sequelize/types";

interface IMigrationState {
  revision?: number;
  version?: number;
  tables: {};
}

const bootstrap = async () => {
  if (process.env.NODE_ENV != "local") {
    console.log("로컬에서만 진행 가능합니다.");
    process.exit(0);
  }

  const sequelizercPath = path.resolve(__dirname, "../../.sequelizerc");
  let configFromSequelizerc = {};
  try {
    configFromSequelizerc = require(sequelizercPath);
    // console.log(configFromSequelizerc); // 내용물 없을 시 {}
  } catch (err) {
    console.log(sequelizercPath + "에 모듈 없음. continue....");
  }
  const modelsPath =
    configFromSequelizerc["models-path"] ||
    path.resolve(__dirname, "../../models");
  const configPath =
    configFromSequelizerc["config"] ||
    path.resolve(__dirname, "../../config/config.json");
  const migrationsPath =
    configFromSequelizerc["migrations-path"] ||
    path.resolve(__dirname, "../../migrations");

  ``;
  const pathsToCheck = [
    { path: modelsPath, msg: "모델 경로가 잘못됨" },
    {
      path: configPath,
      msg: "config 경로가 잘못됨, do 'npx sequelize init' first."
    },
    { path: migrationsPath, msg: "migration 경로가 잘못됨" }
  ];

  pathsToCheck.forEach(value => {
    if (fs.existsSync(value.path) === false) {
      console.log(value.msg);
      process.exit(0);
    }
  });

  const program = createCommand();
  program.version("0.0.1");
  program
    .option(
      "-p, --preview",
      "Show migration preview (does not change any files)"
    )
    .option("-n, --migration-name <name>", "Set migration name", "noname")
    .option("-c, --comment <comment>", "Set migration comment", "")
    .option("-x, --execute", "Create new migration and execute it")
    .option("-g, --migrations-path <path>", "The path to the migrations folder")
    .option("-m, --models-path <path>", "The path to the models folder")
    .option("-v, --verbose", "Show details about the execution")
    .option("-d, --debug", "Show error messages to debug problems")
    .option(
      "-k, --keep-files",
      "Don't delete previous files from the current revision (requires a unique --name option for each file)"
    )
    .parse(process.argv);

  const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.SEQUELIZE_HOST,
    port: Number(process.env.SEQUELIZE_PORT),
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DATABASE,
    models: [modelsPath],
    modelMatch: (_filename, _member) => {
      const filename = inflection.camelize(_filename.replace(".model", ""));
      const member = _member;
      return filename === member;
    },
    timezone: "+09:00"
  });
  const models: {
    [key: string]: ModelCtor<Model>;
  } = sequelize.models;
  await sequelize.authenticate();

  // current state
  const currentState: IMigrationState = {
    tables: {}
  };

  // load last state
  let previousState: IMigrationState = {
    revision: 0,
    version: 1,
    tables: {}
  };
  const queryInterface: QueryInterface = sequelize.getQueryInterface();

  await queryInterface.createTable("SequelizeMeta", {
    name: {
      type: SequelizeTypescriptDataType.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    }
  });
  await queryInterface.createTable("SequelizeMetaMigrations", {
    revision: {
      type: SequelizeTypescriptDataType.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    name: {
      type: SequelizeTypescriptDataType.STRING,
      allowNull: false
    },
    state: {
      type: SequelizeTypescriptDataType.JSON,
      allowNull: false
    }
  });

  const [
    lastExecutedMigration
  ] = await sequelize.query(
    "SELECT name FROM SequelizeMeta ORDER BY name desc limit 1",
    { type: "SELECT" }
  );

  const lastRevision =
    lastExecutedMigration !== undefined
      ? lastExecutedMigration["name"].split("-")[0]
      : -1;
  const [
    lastMigration
  ] = await sequelize.query(
    `SELECT state FROM SequelizeMetaMigrations where revision = '${lastRevision}'`,
    { type: "SELECT" }
  );
  if (lastMigration !== undefined) {
    previousState = lastMigration["state"];
  }

  currentState.tables = reverseModels(sequelize, models);

  const upActions = parseDifference(previousState.tables, currentState.tables);
  const downActions = parseDifference(
    currentState.tables,
    previousState.tables
  );

  sortActions(upActions);
  sortActions(downActions);

  const migration = getMigration(upActions);
  const tmp = getMigration(downActions);

  migration.commandsDown = tmp.commandsUp;

  if (migration.commandsUp.length === 0) {
    console.log("No changes found");
    process.exit(0);
  }

  // log migration actions
  migration.consoleOut.forEach(v => {
    console.log(`[Actions] ${v}`);
  });

  // preview
  if (program.preview) {
    console.log("Migration result:");
    console.log(beautify(`[ \n${migration.commandsUp.join(", \n")} \n];\n`));
    console.log("Undo commands:");
    console.log(beautify(`[ \n${migration.commandsDown.join(", \n")} \n];\n`));
    return 1;
  }

  currentState.revision = previousState.revision + 1;

  const pruneResult = await pruneOldMigFiles(
    currentState.revision,
    migrationsPath,
    program
  );

  const info = writeMigration(
    currentState.revision,
    migration,
    migrationsPath,
    program.migrationName,
    program.comment
  );

  console.log(
    `New migration to revision ${currentState.revision} has been saved to file '${info.filename}'`
  );

  // save current state, Ugly hack, see https://github.com/sequelize/sequelize/issues/8310
  const rows = [
    {
      revision: currentState.revision,
      name: info.info.name,
      state: JSON.stringify(currentState)
    }
  ];

  try {
    await queryInterface.bulkDelete("SequelizeMetaMigrations", {
      revision: currentState.revision
    });
    await queryInterface.bulkInsert("SequelizeMetaMigrations", rows);

    if (program.verbose) {
      console.log("Updated state on DB.");
    }
    if (!program.execute) {
      return 0;
    }
    console.log(`Use sequelize CLI:
  npx sequelize db:migrate --to ${info.revisionNumber}-${info.info.name} ${
      program.migrationsPath
        ? `--migrations-path=${program.migrationsPath}`
        : ""
    } ${program.modelsPath ? `--models-path=${program.modelsPath}` : ""}`);
    return 0;
  } catch (err) {
    if (program.debug) console.error(err);
  }

  return 1;
};
bootstrap();

const reverseModels = (
  sequelize: Sequelize,
  models: {
    [key: string]: ModelCtor<Model>;
  }
) => {
  const tables = {};
  for (let [modelKey, model] of Object.entries(models)) {
    const rowTable = {};
    const attributes: {
      [key: string]: ModelAttributeColumnOptions;
    } = model.rawAttributes;

    const resultAttributes = {};

    for (let [column, attribute] of Object.entries(attributes)) {
      let rowAttribute = {};

      if (attribute.defaultValue) {
        const _val = reverseSequelizeDefValueType(attribute.defaultValue);
        if (_val.notSupported) {
          console.log(
            `[Not supported] Skip defaultValue column of attribute ${model}:${column}`
          );
          continue;
        }
        rowAttribute["defaultValue"] = _val;
      }

      if (attribute.type === undefined) {
        console.log(
          `[Not supported] Skip column with undefined type ${model}:${column}`
        );
        continue;
      }

      let seqType = reverseSequelizeColType(attribute);

      //   NO virtual types in migration
      if (seqType === "Sequelize.VIRTUAL") {
        console.log(
          `[SKIP] Skip Sequelize.VIRTUAL column "${column}"", defined in model "${model}"`
        );
        continue;
      }

      if (seqType === undefined) {
        if (
          typeof attribute.type["options"] !== "undefined" &&
          typeof attribute.type["options"].toString === "function"
        ) {
          seqType = attribute.type["options"].toString(sequelize);
        }

        if (typeof attribute.type.toString === "function") {
          seqType = attribute.type.toString(sequelize);
        }
      }
      rowAttribute = {
        seqType: seqType
      };

      [
        "allowNull",
        "unique",
        "primaryKey",
        "autoIncrement",
        "autoIncrementIdentity",
        "comment",
        "references",
        "onUpdate",
        "onDelete",
        "validate"
      ].forEach(key => {
        if (attribute[key] !== undefined) {
          rowAttribute[key] = attribute[key];
        }
      });

      resultAttributes[column] = rowAttribute;
    } // attributes in model

    // console.log(resultAttributes);

    tables[model.tableName] = {
      tableName: model.tableName,
      schema: resultAttributes
    };

    let idx_out = {};
    if (model.options.indexes.length > 0) {
      for (const _i in model.options.indexes) {
        const index = parseIndex(model.options.indexes[_i]);
        idx_out[`${index["hash"]}`] = index;
        delete index["hash"];
      }
    }
    tables[model.tableName].indexes = idx_out;
  } // model in models

  return tables;
};

const reverseSequelizeColType = (col, prefix = "Sequelize.") => {
  const attrObj: DataType = col.type;
  const options = col.type["options"] ? col.type["options"] : {};

  if (attrObj instanceof SequelizeTypescriptDataType.CHAR) {
    if (options.binary) {
      return `${prefix}CHAR.BINARY`;
    }
    return `${prefix}CHAR(${options.length})`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.STRING) {
    return `${prefix}STRING${options.length ? `(${options.length})` : ""}${
      options.binary ? ".BINARY" : ""
    }`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.TEXT) {
    if (!options.length) {
      return `${prefix}TEXT`;
    }

    return `${prefix}TEXT(${options.length.toLowerCase()})`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.DOUBLE) {
    if (!options.length) {
      return `${prefix}DOUBLE`;
    }

    return `${prefix}DOUBLE(${options.length.toLowerCase()})`;
  }

  // INTEGER, BIGINT, FLOAT, REAL, DOUBLE
  if (attrObj instanceof SequelizeTypescriptDataType.NUMBER) {
    let ret = attrObj.key;
    if (options.length) {
      ret += `(${options.length}`;
      if (options.decimals) {
        ret += `, ${options.decimals}`;
      }
      ret += ")";
    }

    const arrayRet = [ret];

    if (options.zerofill) {
      arrayRet.push("ZEROFILL");
    }

    if (options.unsigned) {
      arrayRet.push("UNSIGNED");
    }

    return prefix + arrayRet.join(".");
  }

  if (attrObj.constructor.name === "ARRAY") {
    // if (attrObj instanceof SequelizeTypescriptDataType.ARRAY) {
    return `${prefix}ARRAY(${reverseSequelizeColType(attrObj, prefix)})`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.ENUM) {
    return `${prefix}ENUM('${options.values.join("', '")}')`;
  }

  if (attrObj.constructor.name === "BOOLEAN") {
    // if (attrObj instanceof SequelizeTypescriptDataType.BOOLEAN) {
    return `${prefix}BOOLEAN`;
  }

  if (attrObj.constructor.name === "TIME") {
    // if (attrObj instanceof SequelizeTypescriptDataType.TIME) {
    return `${prefix}TIME`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.DATEONLY) {
    return `${prefix}DATEONLY`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.DATE) {
    return `${prefix}DATE`;
  }

  //   // Not documented, really?
  if (attrObj.constructor.name === "HSTORE") {
    // if (attrObj instanceof SequelizeTypescriptDataType.HSTORE) {
    return `${prefix}HSTORE`;
  }

  if (attrObj.constructor.name === "JSONB") {
    // if (attrObj instanceof SequelizeTypescriptDataType.JSONB) {
    return `${prefix}JSONB`;
  }

  if (attrObj.constructor.name === "JSON") {
    // if (attrObj instanceof SequelizeTypescriptDataType.JSON) {
    return `${prefix}JSON`;
  }

  if (attrObj.constructor.name === "UUID") {
    // if (attrObj instanceof SequelizeTypescriptDataType.UUID) {
    return `${prefix}UUID`;
  }

  // Virtual data type, we must to skip it
  if (attrObj instanceof SequelizeTypescriptDataType.VIRTUAL) {
    return `${prefix}VIRTUAL`;
  }

  return undefined;

  // other types
  //   if(typeof attrObj['options'] !== 'undefined' && typeof attrObj['options'].toString === 'function')
  //      return attrObj['options'].toString(sequelize);

  // @todo
  // BLOB
  // RANGE
  // GEOMETRY
  // GEOGRAPHY
};

const reverseSequelizeDefValueType = (defaultValue, prefix = "Sequelize.") => {
  if (typeof defaultValue.fn !== "undefined") {
    return {
      internal: true,
      value: `${prefix}fn('${defaultValue.fn}')`
    };
  }

  if (defaultValue.constructor.name == "NOW") {
    return {
      internal: true,
      value: `${prefix}NOW`
    };
  }

  if (defaultValue.constructor.name == "UUIDV1") {
    return {
      internal: true,
      value: `${prefix}UUIDV1`
    };
  }

  if (defaultValue.constructor.name == "UUIDV4") {
    return {
      internal: true,
      value: `${prefix}UUIDV4`
    };
  }

  if (typeof defaultValue === "function") {
    return { notSupported: true, value: "" };
  }

  return { value: defaultValue };
};

const parseIndex = (idx: IndexesOptions) => {
  let result = {};

  [
    "name",
    "type",
    "unique",
    "concurrently",
    "fields",
    "using",
    "operator",
    "where"
  ].forEach(key => {
    if (idx[key] !== undefined) {
      result[key] = idx[key];
    }
  });

  const options = {};

  if (idx.name) {
    options["indexName"] = idx.name;
  } // The name of the index. Default is __

  // @todo: UNIQUE|FULLTEXT|SPATIAL
  if (idx.unique) {
    options["indicesType"] = "UNIQUE";
  }

  // Set a type for the index, e.g. BTREE. See the documentation of the used dialect
  //   if (idx.method) {
  //     options["indexType"] = idx.type;
  //   }

  if (idx.parser && idx.parser !== "") {
    options["parser"] = idx.parser;
  } // For FULLTEXT columns set your parser

  result["options"] = options;

  //   result["hash"] = hash(idx);
  result["hash"] = crypto
    .createHash("sha1")
    .update(JSON.stringify(idx))
    .digest("hex");

  return result;
};

const parseDifference = (previousState, currentState) => {
  const actions = [];
  let difference: Array<Diff<any, any>> = diff(previousState, currentState);
  if (difference === undefined) {
    return actions;
  }

  difference.forEach(df => {
    switch (df.kind) {
      // add new
      case "N":
        {
          // new table created
          if (df.path.length === 1) {
            const depends = [];

            const tableName = df.rhs.tableName;
            Object.values(df.rhs.schema).forEach((v: any) => {
              if (v.references) {
                depends.push(v.references.model);
              }
            });

            actions.push({
              actionType: "createTable",
              tableName,
              attributes: df.rhs.schema,
              options: {},
              depends
            });

            // create indexes
            if (df.rhs.indexes) {
              for (const _i in df.rhs.indexes) {
                const copied = JSON.parse(JSON.stringify(df.rhs.indexes[_i]));
                actions.push(
                  Object.assign(
                    {
                      actionType: "addIndex",
                      tableName,
                      depends: [tableName]
                    },
                    copied
                  )
                );
              }
            }
            break;
          }

          const tableName = df.path[0];
          const depends = [tableName];

          if (df.path[1] === "schema") {
            // if (df.path.length === 3) - new field
            if (df.path.length === 3) {
              // new field
              if (df.rhs && df.rhs.references) {
                depends.push(df.rhs.references.model);
              }

              actions.push({
                actionType: "addColumn",
                tableName,
                attributeName: df.path[2],
                options: df.rhs,
                depends
              });
              break;
            }

            // if (df.path.length > 3) - add new attribute to column (change col)
            if (df.path.length > 3) {
              if (df.path[1] === "schema") {
                // new field attributes
                const options = currentState[tableName].schema[df.path[2]];
                if (options.references) {
                  depends.push(options.references.nodel);
                }

                actions.push({
                  actionType: "changeColumn",
                  tableName,
                  attributeName: df.path[2],
                  options,
                  depends
                });
                break;
              }
            }
          }

          // new index
          if (df.path[1] === "indexes") {
            const tableName = df.path[0];
            const copied = df.rhs
              ? JSON.parse(JSON.stringify(df.rhs))
              : undefined;
            const index = copied;

            index.actionType = "addIndex";
            index.tableName = tableName;
            index.depends = [tableName];
            actions.push(index);
            break;
          }
        }
        break;

      // drop
      case "D":
        {
          const tableName = df.path[0];
          const depends = [tableName];

          if (df.path.length === 1) {
            // drop table
            actions.push({ actionType: "dropTable", tableName, depends: [] });
            break;
          }

          if (df.path[1] === "schema") {
            // if (df.path.length === 3) - drop field
            if (df.path.length === 3) {
              // drop column
              actions.push({
                actionType: "removeColumn",
                tableName,
                columnName: df.path[2],
                depends: [tableName]
              });
              break;
            }

            // if (df.path.length > 3) - drop attribute from column (change col)
            if (df.path.length > 3) {
              // new field attributes
              const options = currentState[tableName].schema[df.path[2]];
              if (options.references) {
                depends.push(options.references.nodel);
              }

              actions.push({
                actionType: "changeColumn",
                tableName,
                attributeName: df.path[2],
                options,
                depends
              });
              break;
            }
          }

          if (df.path[1] === "indexes") {
            //                   console.log(df)
            actions.push({
              actionType: "removeIndex",
              tableName,
              fields: df.lhs.fields,
              options: df.lhs.options,
              depends: [tableName]
            });
            break;
          }
        }
        break;

      // edit
      case "E":
        {
          const tableName = df.path[0];
          const depends = [tableName];

          if (df.path[1] === "schema") {
            // new field attributes
            const options = currentState[tableName].schema[df.path[2]];
            if (options.references) {
              depends.push(options.references.nodel);
            }

            actions.push({
              actionType: "changeColumn",
              tableName,
              attributeName: df.path[2],
              options,
              depends
            });
          }
        }
        break;

      // array change indexes
      case "A":
        {
          console.log(
            "[Not supported] Array model changes! Problems are possible. Please, check result more carefully!"
          );
          console.log("[Not supported] Difference: ");
          console.log(JSON.stringify(df, null, 4));
        }
        break;

      default:
        // code
        break;
    }
  });
  return actions;
};

const sortActions = actions => {
  const orderedActionTypes = [
    "removeIndex",
    "removeColumn",
    "dropTable",
    "createTable",
    "addColumn",
    "changeColumn",
    "addIndex"
  ];

  actions.sort((a, b) => {
    if (
      orderedActionTypes.indexOf(a.actionType) <
      orderedActionTypes.indexOf(b.actionType)
    ) {
      return -1;
    }
    if (
      orderedActionTypes.indexOf(a.actionType) >
      orderedActionTypes.indexOf(b.actionType)
    ) {
      return 1;
    }

    if (a.depends.length === 0 && b.depends.length > 0) {
      return -1;
    } // a < b
    if (b.depends.length === 0 && a.depends.length > 0) {
      return 1;
    } // b < a

    return 0;
  });

  for (let k = 0; k <= actions.length; k++) {
    for (let i = 0; i < actions.length; i++) {
      if (!actions[i].depends) {
        continue;
      }
      if (actions[i].depends.length === 0) {
        continue;
      }

      const a = actions[i];

      for (let j = 0; j < actions.length; j++) {
        if (!actions[j].depends) {
          continue;
        }
        if (actions[j].depends.length === 0) {
          continue;
        }

        const b = actions[j];

        if (a.actionType != b.actionType) {
          continue;
        }

        if (b.depends.indexOf(a.tableName) !== -1 && i > j) {
          const c = actions[i];
          actions[i] = actions[j];
          actions[j] = c;
        }
      }
    }
  }
};

const getMigration = actions => {
  const propertyToStr = obj => {
    const vals = [];
    for (const k in obj) {
      if (k === "seqType") {
        vals.push(`"type": ${obj[k]}`);
        continue;
      }

      if (k === "defaultValue") {
        if (obj[k].internal) {
          vals.push(`"defaultValue": ${obj[k].value}`);
          continue;
        }
        if (obj[k].notSupported) {
          continue;
        }

        const x = {};
        x[k] = obj[k].value;
        vals.push(JSON.stringify(x).slice(1, -1));
        continue;
      }

      const x = {};
      x[k] = obj[k];
      vals.push(JSON.stringify(x).slice(1, -1));
    }

    return `{ ${vals
      .filter(v => v !== "")
      .reverse()
      .join(", ")} }`;
  };

  const getAttributes = attrs => {
    const ret = [];
    for (const attrName in attrs) {
      ret.push(`      "${attrName}": ${propertyToStr(attrs[attrName])}`);
    }
    return ` { \n${ret.join(", \n")}\n     }`;
  };

  const commandsUp = [];
  const commandsDown = [];
  const consoleOut = [];

  for (const _i in actions) {
    const action = actions[_i];

    switch (action.actionType) {
      case "createTable":
        {
          const resUp = `
{ fn: "createTable", params: [
"${action.tableName}",
${getAttributes(action.attributes)},
${JSON.stringify(action.options)}
] }`;
          commandsUp.push(resUp);

          consoleOut.push(
            `createTable "${action.tableName}", deps: [${action.depends.join(
              ", "
            )}]`
          );
        }
        break;

      case "dropTable":
        {
          const res = `{ fn: "dropTable", params: ["${action.tableName}"] }`;
          commandsUp.push(res);

          consoleOut.push(`dropTable "${action.tableName}"`);
        }
        break;

      case "addColumn":
        {
          const resUp = `{ fn: "addColumn", params: [
    "${action.tableName}",
    "${action.attributeName}",
    ${propertyToStr(action.options)}
] }`;

          commandsUp.push(resUp);

          consoleOut.push(
            `addColumn "${action.attributeName}" to table "${action.tableName}"`
          );
        }
        break;

      case "removeColumn":
        {
          const res = `{ fn: "removeColumn", params: ["${action.tableName}", "${action.columnName}"] }`;
          commandsUp.push(res);

          consoleOut.push(
            `removeColumn "${action.columnName}" from table "${action.tableName}"`
          );
        }
        break;

      case "changeColumn":
        {
          const res = `{ fn: "changeColumn", params: [
    "${action.tableName}",
    "${action.attributeName}",
    ${propertyToStr(action.options)}
] }`;
          commandsUp.push(res);

          consoleOut.push(
            `changeColumn "${action.attributeName}" on table "${action.tableName}"`
          );
        }
        break;

      case "addIndex":
        {
          const res = `{ fn: "addIndex", params: [
    "${action.tableName}",
    ${JSON.stringify(action.fields)},
    ${JSON.stringify(action.options)}
] }`;
          commandsUp.push(res);

          const nameOrAttrs =
            action.options &&
            action.options.indexName &&
            action.options.indexName != ""
              ? `"${action.options.indexName}"`
              : JSON.stringify(action.fields);
          consoleOut.push(
            `addIndex ${nameOrAttrs} to table "${action.tableName}"`
          );
        }
        break;

      case "removeIndex": {
        const nameOrAttrs =
          action.options &&
          action.options.indexName &&
          action.options.indexName != ""
            ? `"${action.options.indexName}"`
            : JSON.stringify(action.fields);

        const res = `{ fn: "removeIndex", params: [
          "${action.tableName}",
          ${nameOrAttrs}
      ] }`;
        commandsUp.push(res);

        consoleOut.push(
          `removeIndex ${nameOrAttrs} from table "${action.tableName}"`
        );
        break;
      }

      default:
      // code
    }
  }

  return { commandsUp, commandsDown, consoleOut };
};

const pruneOldMigFiles = (
  revision,
  migrationsPath,
  options
): Promise<Boolean> => {
  // if old files can't be deleted, we won't stop the execution

  return new Promise<Boolean>((resolve, reject) => {
    if (options.keepFiles) {
      resolve(false);
    }
    try {
      const files: String[] = fs.readdirSync(migrationsPath);
      if (files.length === 0) {
        resolve(false);
      }

      let i = 0;
      files.forEach(file => {
        i += 1;
        if (file.split("-")[0] === revision.toString()) {
          fs.unlinkSync(`${migrationsPath}/${file}`);
          if (options.verbose) {
            console.log(`Successfully deleted ${file}`);
            resolve(true);
          }
        }
        if (i === files.length) {
          resolve(false);
        }
      });
    } catch (err) {
      // if (options.debug) console.error(`Can't read dir: ${err}`);
      // console.log(`Failed to delete mig file: ${error}`);
      if (options.debug) console.error(`에러발생: ${err}`);
      resolve(false);
    }
  });
};

const writeMigration = (
  revision,
  migration,
  migrationsPath,
  name = "",
  comment = ""
) => {
  let commands = `var migrationCommands = [ \n${migration.commandsUp.join(
    ", \n"
  )} \n];\n`;
  let commandsDown = `var rollbackCommands = [ \n${migration.commandsDown.join(
    ", \n"
  )} \n];\n`;

  const actions = ` * ${migration.consoleOut.join("\n * ")}`;

  commands = beautify(commands);
  commandsDown = beautify(commandsDown);

  const info = {
    revision,
    name,
    created: new Date(),
    comment
  };

  const template = `'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
${actions}
 *
 **/

var info = ${JSON.stringify(info, null, 4)};

${commands}

${commandsDown}

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    down: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < rollbackCommands.length)
                {
                    let command = rollbackCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
`;

  const revisionNumber = revision.toString().padStart(8, "0");

  const filename = path.join(
    migrationsPath,
    `${revisionNumber +
      (name !== "" ? `-${name.replace(/[\s-]/g, "_")}` : "")}.js`
  );

  fs.writeFileSync(filename, template);

  return { filename, info, revisionNumber };
};
