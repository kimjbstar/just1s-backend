import * as fs from "fs";
import * as path from "path";
import * as inflection from "inflection";
import * as Handlebars from "handlebars";

const input = {
  name: "post",
  fields: [
    {
      name: "type",
      type: "ENUM",
      values: ["red", "blue", "green"],
    },
    {
      name: "name",
      type: "VARCHAR",
    },
    {
      name: "phoneNumber",
      type: "VARCHAR(16)",
    },
    {
      name: "price",
      type: "INTEGER",
    },
    {
      name: "int1",
      type: "INTEGER",
      args: {
        unsigned: true,
      },
    },
    {
      name: "int1",
      type: "INTEGER",
      args: {
        binary: true,
        zerofill: true,
      },
    },
    {
      name: "lat",
      type: "DECIMAL(5,3)",
    },
    {
      name: "isGood",
      type: "BOOLEAN",
      args: {
        allowNull: true,
      },
    },
    {
      name: "beginAt",
      type: "DATE",
    },
    {
      name: "endAt",
      type: "DATE(4)",
    },
    // TODO store fk
  ],
};

const tsTypes = {
  BOOLEAN: "boolean",
  VARCHAR: "string",
  DECIMAL: "number",
  INTEGER: "number",
  DATE: "Date",
};

interface IMetadata {
  name: string;
  fields?: IMetadataField[];
  enums?: object;
}

interface IMetadataField {
  name: string;
  options: any;
  originType: string;
  seqType: any;
  tsType: any;
}

const getEnums = table => {
  const result = {};
  table.fields
    .filter(field => {
      return field.type === "ENUM";
    })
    .map(field => {
      const name =
        inflection.capitalize(table.name) + inflection.capitalize(field.name);
      let code = `export enum ${name} {
        `;
      field.values.forEach(enumField => {
        code += `  ${enumField} = "${enumField}"
        `;
      });
      code += "}";
      result[field.name] = {
        name: name,
        values: field.values,
        code: code,
        tsType: "ENUM" + `({ values: Object.values(${field.values})})`,
        union: field.values.join(" | "),
      };
    });
  return result;
};

const parseSeqType = (field, enums) => {
  let tsType = field.type;
  if (field.type !== "ENUM") {
    if (field.args?.binary) {
      tsType += ".BINARY";
    }
    if (field.args?.zerofill) {
      tsType += ".ZEROFILL";
    }
    if (field.args?.unsgined) {
      tsType += ".UNSIGNED";
    }
  } else {
    const tsEnum = enums[field.name];
    tsType = "ENUM" + `({ values: Object.values(${tsEnum.name})})`;
  }
  tsType = tsType.replace("VARCHAR", "STRING");

  return "DataType." + tsType;
};

const parseTsType = (field, enums) => {
  if (field.type === "ENUM") {
    return enums[field.name].name;
  }
  if (tsTypes[field.type.replace(/\(.*\)/, "")] === undefined) {
    return "unknown";
  }
  return tsTypes[field.type.replace(/\(.*\)/, "")];
};

const loadTemplate = async path => {
  const buffer: Buffer = fs.readFileSync(path);
  return buffer.toString();
};

const bootstrap = async () => {
  Handlebars.registerHelper("pluralize", str => inflection.pluralize(str));
  Handlebars.registerHelper("capitalize", str => inflection.capitalize(str));
  Handlebars.registerHelper("plucapitalize", str =>
    inflection.pluralize(inflection.capitalize(str))
  );
  Handlebars.registerHelper("singularize", str => inflection.singularize(str));
  Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
    switch (operator) {
      case "==":
        return v1 == v2 ? options.fn(this) : options.inverse(this);
      case "===":
        return v1 === v2 ? options.fn(this) : options.inverse(this);
      case "!=":
        return v1 != v2 ? options.fn(this) : options.inverse(this);
      case "!==":
        return v1 !== v2 ? options.fn(this) : options.inverse(this);
      case "<":
        return v1 < v2 ? options.fn(this) : options.inverse(this);
      case "<=":
        return v1 <= v2 ? options.fn(this) : options.inverse(this);
      case ">":
        return v1 > v2 ? options.fn(this) : options.inverse(this);
      case ">=":
        return v1 >= v2 ? options.fn(this) : options.inverse(this);
      case "&&":
        return v1 && v2 ? options.fn(this) : options.inverse(this);
      case "||":
        return v1 || v2 ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });

  const templateTypes = ["model", "enum", "controller", "service", "module"];
  const templates = {};
  for (const tType of templateTypes) {
    templates[tType] = await loadTemplate(
      path.join(__dirname, `templates/${tType}.template`)
    );
  }
  console.log(templates);

  let metadata: IMetadata = {
    name: input.name,
  };

  const enums = getEnums(input);
  metadata.enums = enums;

  metadata.fields = input.fields.map(field => {
    const options = {};
    ["allowNull", "unique", "defalutValue"].forEach(arg => {
      if (field.args && field.args[arg]) {
        options[arg] = field.args[arg];
      }
    });

    const seqType = parseSeqType(field, enums);
    const tsType = parseTsType(field, enums);

    return {
      name: field.name,
      options: options,
      originType: field.type,
      seqType: seqType,
      tsType: tsType,
    };
  });
  console.dir(metadata, { depth: 3 });

  const codes = {};
  for (const tType of templateTypes) {
    codes[tType] = Handlebars.compile(templates[tType])(metadata);
    const pluralName = inflection.pluralize(metadata.name);
    const dirs = `/src/modules/${pluralName}/`;
    const fileName =
      tType !== "model"
        ? `${pluralName}.${tType}.ts`
        : `${pluralName}.${inflection.singularize(tType)}.ts`;
    const fullPath = path.join(process.cwd(), dirs, fileName);
    console.log(fullPath);
    await fs.mkdirSync(path.join(process.cwd(), dirs), { recursive: true });
    await fs.writeFileSync(fullPath, codes[tType]);
  }
};
bootstrap();
