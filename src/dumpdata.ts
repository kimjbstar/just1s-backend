import { Sequelize, ModelCtor, Model } from "sequelize-typescript";
import * as inflection from "inflection";
import * as path from "path";
import * as fs from "fs";
// import { Review } from "./models/_legacy/review.model";
import {
  Op,
  ModelAttributeColumnOptions,
  Model as NativeSequelizeModel,
  QueryTypes
} from "sequelize";

export type SequelizeModelCtor = ModelCtor<Model<any, any>>;

export interface SequelizeModelCtorMap {
  [key: string]: ModelCtor<Model<any, any>>;
}

const bootstrap = async () => {
  const fixtureDir = path.join(process.cwd(), "./tests/fixtures");

  const modelPath = path.join(__dirname, "./models");

  const sequelize: Sequelize = new Sequelize({
    database: "just1s",
    username: "kimjbstar",
    password: "12091457",
    dialect: "mysql",
    host: "localhost",
    models: [modelPath],
    modelMatch: (_filename, _member) => {
      const filename = inflection.camelize(_filename.replace(".model", ""));
      const member = _member;
      return filename === member;
    },
    timezone: "+09:00",
    logging: false
  });

  let tableNameModelMap = {};

  for (let [key, model] of Object.entries(sequelize.models)) {
    const tableName: string = model.tableName;
    tableNameModelMap[tableName] = model;
  }

  let fkModelMap = {};
  for (let [key, _model] of Object.entries(sequelize.models)) {
    const attributes: { [attribute: string]: ModelAttributeColumnOptions } =
      _model.rawAttributes;

    let fkModelMapRow = {};
    for (let [key, value] of Object.entries(attributes)) {
      if (value.references) {
        const tableName = value.references.model.toString();
        const parentModel: SequelizeModelCtorMap = tableNameModelMap[tableName];
        fkModelMapRow[key] = parentModel;
      }
    }
    fkModelMap[_model.tableName] = fkModelMapRow;
  }

  // const res = await getModelAndPks(Review, [8, 9], fkModelMap);
  // res.forEach(async (row) => {
  //   const sql = `SELECT * FROM ${
  //     row.modelClass.tableName
  //   } WHERE id IN(${row.ids.join(",")})`;
  //   const rows = await sequelize.query(sql, { type: QueryTypes.SELECT });
  //   const filePath = path.join(fixtureDir, row.modelClass.tableName);
  //   await fs.writeFileSync(filePath, JSON.stringify(rows));
  //   console.log(`saved ${rows.length} fixture rows to ${filePath}.`);
  // });
};

const getModelAndPks = async (
  modelCtor: SequelizeModelCtor,
  pks: number[],
  fkModelMap: {
    [attribute: string]: ModelAttributeColumnOptions;
  }
) => {
  const rows = await modelCtor.findAll({
    where: {
      id: {
        [Op.in]: pks
      }
    }
  });

  const subParams = {};

  for (let [fkFieldName, modelClass] of Object.entries(
    fkModelMap[modelCtor.tableName]
  )) {
    rows
      .filter((row) => row[fkFieldName])
      .forEach((row) => {
        if (subParams[modelClass.tableName] === undefined) {
          subParams[modelClass.tableName] = {
            modelClass: modelClass,
            ids: []
          };
        }
        if (subParams[modelClass.tableName].ids.indexOf(row[fkFieldName]) < 0) {
          subParams[modelClass.tableName].ids.push(row[fkFieldName]);
        }
      });

    if (subParams[modelClass.tableName]) {
      subParams[modelClass.tableName] = await getModelAndPks(
        modelClass,
        subParams[modelClass.tableName].ids,
        fkModelMap
      );
    }
  }

  let result = [];
  result.push({
    modelClass: modelCtor,
    ids: pks
  });

  for (let [k, v] of Object.entries(subParams)) {
    result = result.concat(Object.values(v));
  }

  return result;
};

bootstrap();
