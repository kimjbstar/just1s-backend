import * as fs from "fs";
import * as path from "path";
import * as inflection from "inflection";
import * as Handlebars from "handlebars";
import { KoreanFieldNameMap } from "./utils/kor";
import { HandlebarHelpers } from "./utils/handlebar";

const TEMPLATE_TYPES = [
  {
    key: "model",
    getDirectory: (name) => `/src/models`,
    getFileName: (name) =>
      `${inflection.underscore(inflection.singularize(name))}.model.ts`,
    sub: true
  },
  {
    key: "enum",
    getDirectory: (name) => `/src/modules/${inflection.pluralize(name)}`,
    getFileName: (name) =>
      `${inflection.underscore(inflection.singularize(name))}.model.ts`
  },
  {
    key: "controller",
    getDirectory: (name) => `/src/modules/${inflection.pluralize(name)}`,
    getFileName: (name) => `${inflection.pluralize(name)}.controller.ts`
  },
  {
    key: "service",
    getDirectory: (name) => `/src/modules/${inflection.pluralize(name)}`,
    getFileName: (name) => `${inflection.pluralize(name)}.service.ts`
  },
  {
    key: "module",
    getDirectory: (name) => `/src/modules/${inflection.pluralize(name)}`,
    getFileName: (name) => `${inflection.pluralize(name)}.module.ts`
  }
];

interface IScaffoldInput {
  name: string;
  fields: IScaffoldInputField[];
  subModels?: IScaffoldInput[];
  belongsToModels?: string[];
}
interface IScaffoldInputField {
  name: string;
  type: string;
  values?: string[];
  args?: {
    [key: string]: boolean;
  };
}

const input: IScaffoldInput = {
  name: "product",
  fields: [
    {
      name: "type",
      type: "ENUM",
      values: ["red", "blue", "green"]
      // TODO : 기본값 처리 추가, ENUM 은 미입력시 첫번째값을 기본값으로 삼는다.
      // TODO : allowNull 기본 false로 잡도록 처리
    },
    {
      name: "name",
      type: "VARCHAR"
    },
    {
      name: "phoneNumber",
      type: "VARCHAR(16)"
    },
    {
      name: "price",
      type: "INTEGER"
    },
    {
      name: "int1",
      type: "INTEGER",
      args: {
        zerofill: true
      }
    },
    {
      name: "lat",
      type: "DECIMAL(5,3)"
    },
    {
      name: "isGood",
      type: "BOOLEAN",
      args: {
        allowNull: true
      }
    },
    {
      name: "beginAt",
      type: "DATE"
    },
    {
      name: "endAt",
      type: "DATE(4)"
    }
  ],
  subModels: [
    {
      name: "image",
      fields: [
        {
          name: "imgUrl",
          type: "VARCHAR(128)"
        }
      ]
      // TODO : name 보고 무조건 subtable true 되도록 처리
      // subtalbe은 create때 입력 처리 필요
      // 모델 자체의 존재는 체크하지 않는 방안 고려중, 생성 시에 조건을 너무 많이 걸면 한꺼번에 만들어둘때 힘들 수가 있다. 생성후 일괄 에러 수정이 빠를 때가 있을 수도 있다.
    }
  ],
  // TODO : lnclude에 추가, foreignkey, belongsTo 붙은 필드 각각추가
  belongsToModels: ["store"]
};

const tsTypes = {
  BOOLEAN: "boolean",
  VARCHAR: "string",
  DECIMAL: "number",
  INTEGER: "number",
  DATE: "Date"
};

interface IMetadata {
  name: string;
  fields?: IMetadataField[];
  originalName?: string;
  belongsToModels?: string[];
  hasManyModels?: any[];
  enums?: object;
  isSub?: boolean;
}

interface IMetadataField {
  name: string;
  options: any;
  originType: string;
  seqType: any;
  tsType: any;
}

const getEnums = (table) => {
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

const loadTemplate = async (path) => {
  const buffer: Buffer = fs.readFileSync(path);
  return buffer.toString();
};

const getKoreanWordIfExists = (str) => {
  return KoreanFieldNameMap[str] ? KoreanFieldNameMap[str] : str;
};

const bootstrap = async () => {
  for (let [key, value] of Object.entries(HandlebarHelpers)) {
    Handlebars.registerHelper(key, value);
  }

  const templates = {};
  for (const templateType of TEMPLATE_TYPES) {
    templates[templateType.key] = await loadTemplate(
      path.join(__dirname, `templates/${templateType.key}.template`)
    );
  }

  const metadata: IMetadata = parseInput(input);
  metadata.isSub = false;
  metadata.hasManyModels = [];

  const subMetadatas: IMetadata[] = [];
  if (input.subModels.length > 0) {
    input.subModels.forEach((subModel) => {
      const originalName = subModel.name;
      subModel.name = [input.name, subModel.name].join("_");

      const subMetadata = parseInput(subModel);
      subMetadata.isSub = true;
      subMetadata.originalName = originalName;

      subMetadata.belongsToModels = [metadata.name];
      subMetadatas.push(subMetadata);

      metadata.hasManyModels.push(subMetadata);
    });
  }

  console.dir(metadata, { depth: 3 });

  const codes = {};
  for (const templateType of TEMPLATE_TYPES) {
    codes[templateType.key] = Handlebars.compile(templates[templateType.key])(
      metadata
    );
    const dirs = templateType.getDirectory(metadata.name);
    const fileName = templateType.getFileName(metadata.name);
    const fullPath = path.join(process.cwd(), dirs, fileName);
    console.log(fullPath);

    await fs.mkdirSync(
      path.join(process.cwd(), templateType.getDirectory(metadata.name)),
      { recursive: true }
    );
    await fs.writeFileSync(fullPath, codes[templateType.key]);
  }

  if (subMetadatas.length > 0) {
    subMetadatas.forEach(async (subMetadata) => {
      for (const templateType of TEMPLATE_TYPES) {
        if (!templateType.sub) {
          continue;
        }
        codes[templateType.key] = Handlebars.compile(
          templates[templateType.key]
        )(subMetadata);
        const dirs = templateType.getDirectory(subMetadata.name);
        const fileName = templateType.getFileName(subMetadata.name);
        const fullPath = path.join(process.cwd(), dirs, fileName);
        console.log(fullPath);

        await fs.mkdirSync(
          path.join(process.cwd(), templateType.getDirectory(metadata.name)),
          { recursive: true }
        );
        await fs.writeFileSync(fullPath, codes[templateType.key]);
      }
    });
  }
};
bootstrap();

const parseInput = (input: IScaffoldInput): IMetadata => {
  const belongsToModels = input.belongsToModels?.length
    ? input.belongsToModels
    : [];

  const enums = getEnums(input);

  const fields = input.fields.map((field) => {
    const options = {
      allowNull: false
    };
    ["allowNull", "unique", "defaultValue"].forEach((arg) => {
      if (field.args && field.args[arg]) {
        options[arg] = field.args[arg];
      }
    });

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
