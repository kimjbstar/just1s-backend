import { KoreanFieldNameMap } from "./kor";
import { IScaffoldInput, IMetadata } from "./constants";
import * as inflection from "inflection";
import * as fs from "fs";

export const getEnums = (table) => {
  const result = {};
  table.fields
    .filter((field) => {
      return field.type === "ENUM";
    })
    .map((field) => {
      const name =
        inflection.capitalize(table.name) + inflection.capitalize(field.name);
      let code = `export enum ${name} {
          `;
      field.values.forEach((enumField) => {
        code += `  ${enumField} = "${enumField}"
          `;
      });
      code += "}";
      result[field.name] = {
        name: name,
        values: field.values,
        code: code,
        typescriptType: `ENUM({ values: Object.values(${field.values})})`
        // className: inflection.camelize([table.name, field.name].join("_"))
      };
    });
  return result;
};

export const parseToTypeORM = (field, enums) => {
  const options = {};
  ["unique", "default", "binary", "zerofill", "unsigned"].forEach((arg) => {
    if (field[arg]) {
      options[arg] = field[arg];
    }
  });
  if (field["allowNull"]) {
    options["nullable"] = field["allowNull"];
  }

  if (field.type == "ENUM") {
    const enumName = enums[field.name].name;
    options["enum"] = enumName;
    options["default"] = enumName + "." + field.values[0].toUpperCase();
    return ["enum", enums[field.name].name, options];
  }

  const paramMatched = field.type.match(new RegExp(/[A-Z]*\((.*)\)/));
  const params =
    paramMatched !== null
      ? paramMatched[1].split(",").map((v) => Number(v))
      : [];
  const fieldNameString = field.type.replace(/\(.*\)/, "");

  if (fieldNameString == "INTEGER") {
    options["default"] = 0;
    return ["int", "number", options];
  }
  if (fieldNameString == "BOOLEAN") {
    return ["boolean", "boolean", options];
  }
  if (fieldNameString == "VARCHAR") {
    options["default"] = '""';
    if (params[0]) {
      options["length"] = params[0];
    }
    return ["varchar", "string", options];
  }
  if (fieldNameString == "DATE") {
    return ["date", "Date", options];
  }
  if (fieldNameString == "DECIMAL") {
    if (params[0]) {
      options["precision"] = params[0];
    }
    if (params[1]) {
      options["scale"] = params[1];
    }
    return ["decimal", "number", options];
  }
  if (fieldNameString == "DATETIME") {
    if (params[0]) {
      options["precision"] = params[0];
    }
    return ["decimal", "string", options];
  }

  return ["unknown", "unknown", options];
};

export const loadTemplate = async (path) => {
  const buffer: Buffer = fs.readFileSync(path);
  return buffer.toString();
};

export const getKoreanWordIfExists = (str) => {
  return KoreanFieldNameMap[str] ? KoreanFieldNameMap[str] : str;
};

export const parseInput = (input: IScaffoldInput): IMetadata => {
  const belongsToEntityNames = input.belongsToEntityNames?.length
    ? input.belongsToEntityNames
    : [];

  const enums = getEnums(input);
  const fields = input.fields.map((field) => {
    const [ORMColumnType, typescriptType, options] = parseToTypeORM(
      field,
      enums
    );

    return {
      name: field.name,
      korName: getKoreanWordIfExists(field.name),
      options: options,
      originType: field.type,
      ORMColumnType: ORMColumnType,
      typescriptType: typescriptType
    };
  });

  const result: IMetadata = {
    name: input.name,
    enums: enums,
    fields: fields,
    belongsToEntityNames: belongsToEntityNames
  };

  return result;
};
