import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import * as fs from "fs";
import * as beautify from "js-beautify";
import commander from "commander";
import { IMigrationState, ISequelizeRc, sequelizeRcPath } from "./constants";
import { ModelCtor, Model, QueryInterface } from "sequelize/types";
import parseArgs from "./utils/parseArgs";
import getTablesFromModels from "./utils/getTablesFromModels";
import getDiffActionsFromTables from "./utils/getDiffActionsFromTables";
import getMigration from "./utils/getMigration";
import createMigrationTable from "./utils/createMigrationTable";
import getLastMigrationState from "./utils/getLastMigrationState";
import writeMigration from "./utils/writeMigration";

const bootstrap = async () => {
  if (process.env.NODE_ENV != "local") {
    console.log("로컬에서만 진행 가능합니다.");
    process.exit(0);
  }

  const program: commander.Command = parseArgs(process.argv);

  let sequelizeRc: ISequelizeRc = {};
  try {
    sequelizeRc = require(sequelizeRcPath);
  } catch (err) {
    console.log(
      `it must need .sequelizerc file !!, not exists in ${sequelizeRcPath}.`
    );
    process.exit(0);
  }

  const configPath: string = sequelizeRc.config;
  const modelsPath: string = program.modelsPath || sequelizeRc["models-path"];
  const migrationsPath: string =
    program.migrationsPath || sequelizeRc["migrations-path"];

  const pathsToCheck = [
    {
      path: configPath,
      msg: `Invalid config path. do 'npx sequelize init' first.`
    },
    {
      path: modelsPath,
      msg: `Invalid model path (${modelsPath})`
    },
    {
      path: migrationsPath,
      msg: `Invalid migration path (${migrationsPath})`
    }
  ];

  pathsToCheck.forEach(value => {
    if (value.path === undefined || fs.existsSync(value.path) === false) {
      console.log(value.msg);
      process.exit(0);
    }
  });

  let sequelizeConfig: SequelizeOptions;
  try {
    sequelizeConfig = require(configPath)[process.env.NODE_ENV];
    sequelizeConfig.logging = false;
  } catch (err) {
    console.log(
      `it must need .sequelizerc file !!, not exists in ${configPath}.`
    );
    process.exit(0);
  }

  // error handling
  const sequelize = new Sequelize(sequelizeConfig);
  const models: {
    [key: string]: ModelCtor<Model>;
  } = sequelize.models;
  await sequelize.authenticate();

  const queryInterface: QueryInterface = sequelize.getQueryInterface();

  await createMigrationTable(sequelize);
  const lastMigrationState = await getLastMigrationState(sequelize);

  // CHECK : version 쓰이는지
  const previousState: IMigrationState = {
    revision:
      lastMigrationState !== undefined ? lastMigrationState["revision"] : 0,
    version:
      lastMigrationState !== undefined ? lastMigrationState["version"] : 1,
    tables: lastMigrationState !== undefined ? lastMigrationState["tables"] : {}
  };
  const currentState: IMigrationState = {
    revision: previousState.revision + 1,
    tables: getTablesFromModels(sequelize, models)
  };

  const upActions = getDiffActionsFromTables(
    previousState.tables,
    currentState.tables
  );
  const downActions = getDiffActionsFromTables(
    currentState.tables,
    previousState.tables
  );
  console.log(upActions);

  const migration = getMigration(upActions);
  const tmp = getMigration(downActions);

  migration.commandsDown = tmp.commandsUp;

  if (migration.commandsUp.length === 0) {
    console.log("No changes found");
    process.exit(0);
  }

  // log
  migration.consoleOut.forEach(v => {
    console.log(`[Actions] ${v}`);
  });
  if (program.preview) {
    console.log("Migration result:");
    console.log(beautify(`[ \n${migration.commandsUp.join(", \n")} \n];\n`));
    console.log("Undo commands:");
    console.log(beautify(`[ \n${migration.commandsDown.join(", \n")} \n];\n`));
    return 1;
  }

  const info = await writeMigration(
    currentState.revision,
    migration,
    migrationsPath,
    program
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
    console.log(`Use sequelize CLI:
  npx sequelize db:migrate --to ${info.revisionNumber}-${info.info.name}.js ${
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
