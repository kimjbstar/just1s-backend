import { KoreanFieldNameMap } from "./kor";
import { tsTypes, IScaffoldInput, IMetadata } from "./constants";
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
        tsType: `ENUM({ values: Object.values(${field.values})})`
      };
    });
  return result;
};

export const parseSeqType = (field, enums) => {
  let tsType = field.type;
  if (field.type !== "ENUM") {
    if (field.binary) {
      tsType += ".BINARY";
    }
    if (field.zerofill) {
      tsType += ".ZEROFILL";
    }
    if (field.unsigned) {
      tsType += ".UNSIGNED";
    }
  } else {
    const tsEnum = enums[field.name];
    tsType = "ENUM" + `({ values: Object.values(${tsEnum.name})})`;
  }
  tsType = tsType.replace("VARCHAR", "STRING");

  return "DataType." + tsType;
};

export const parseTsType = (field, enums) => {
  if (field.type === "ENUM") {
    return enums[field.name].name;
  }
  if (tsTypes[field.type.replace(/\(.*\)/, "")] === undefined) {
    return "unknown";
  }
  return tsTypes[field.type.replace(/\(.*\)/, "")];
};

export const loadTemplate = async (path) => {
  const buffer: Buffer = fs.readFileSync(path);
  return buffer.toString();
};

export const getKoreanWordIfExists = (str) => {
  return KoreanFieldNameMap[str] ? KoreanFieldNameMap[str] : str;
};

export const parseInput = (input: IScaffoldInput): IMetadata => {
  const belongsToModels = input.belongsToModels?.length
    ? input.belongsToModels
    : [];

  const enums = getEnums(input);

  const fields = input.fields.map((field) => {
    const options = {
      allowNull: false
    };

    if (field.type == "ENUM") {
      if (
        field.defaultValue === undefined ||
        field.values.indexOf(field.defaultValue) < 0
      ) {
        const enumName = enums[field.name].name;
        field.defaultValue = enumName + "." + field.values[0];
      }
    }
    ["allowNull", "unique", "defaultValue"].forEach((arg) => {
      if (field[arg]) {
        options[arg] = field[arg];
      }
    });
    console.log(field);

    const seqType = parseSeqType(field, enums);
    const tsType = parseTsType(field, enums);

    return {
      name: field.name,
      korName: getKoreanWordIfExists(field.name),
      options: options,
      originType: field.type,
      seqType: seqType,
      tsType: tsType
    };
  });

  const result: IMetadata = {
    name: input.name,
    enums: enums,
    fields: fields,
    belongsToModels: belongsToModels
  };

  return result;
};
