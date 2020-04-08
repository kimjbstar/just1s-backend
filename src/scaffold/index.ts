import * as fs from "fs";
import * as path from "path";
import * as inflection from "inflection";
import * as Handlebars from "handlebars";
import { KoreanFieldNameMap } from "./utils/kor";
import { HandlebarHelpers } from "./utils/handlebar";

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
      values: ["red", "blue", "green"],
      // TODO : 기본값 처리 추가, ENUM 은 미입력시 첫번째값을 기본값으로 삼는다.
      // TODO : allowNull 기본 false로 잡도록 처리
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
  ],
  subModels: [
    {
      name: "PostImage",
      fields: [
        {
          name: "imgUrl",
          type: "VARCHAR(128)",
        },
      ],
      // TODO : name 보고 무조건 subtable true 되도록 처리
      // subtalbe은 create때 입력 처리 필요
      // 모델 자체의 존재는 체크하지 않는 방안 고려중, 생성 시에 조건을 너무 많이 걸면 한꺼번에 만들어둘때 힘들 수가 있다. 생성후 일괄 에러 수정이 빠를 때가 있을 수도 있다.
    },
  ],
  // TODO : lnclude에 추가, foreignkey, belongsTo 붙은 필드 각각추가
  belongsToModels: ["store"],
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
        tsType: `ENUM({ values: Object.values(${field.values})})`,
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

const getKoreanWordIfExists = str => {
  return KoreanFieldNameMap[str] ? KoreanFieldNameMap[str] : str;
};

const bootstrap = async () => {
  for (let [key, value] of Object.entries(HandlebarHelpers)) {
    Handlebars.registerHelper(key, value);
  }

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
    const options = {
      allowNull: false,
    };
    ["allowNull", "unique", "defaultValue"].forEach(arg => {
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
      tsType: tsType,
    };
  });
  console.dir(metadata, { depth: 3 });

  metadata["v1"] = 1;
  metadata["v2"] = 2;

  const codes = {};
  for (const tType of templateTypes) {
    codes[tType] = Handlebars.compile(templates[tType])(metadata);
    const pluralName = inflection.pluralize(metadata.name);
    const dirs =
      tType !== "model" ? `/src/modules/${pluralName}/` : `/src/models`;
    const fileName =
      tType !== "model" && tType !== "enum"
        ? `${pluralName}.${tType}.ts`
        : `${inflection.singularize(pluralName)}.${tType}.ts`;
    const fullPath = path.join(process.cwd(), dirs, fileName);
    console.log(fullPath);
    // console.log(codes[tType]);

    await fs.mkdirSync(path.join(process.cwd(), dirs), { recursive: true });
    await fs.writeFileSync(fullPath, codes[tType]);
  }
  // console.log(codes["model"]);
};
bootstrap();
