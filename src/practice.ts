import { Sequelize, ModelCtor, Model } from "sequelize-typescript";
import { Store } from "./models/store.model";
import * as inflection from "inflection";
import * as path from "path";
import { Review } from "./models/review.model";
import { Op, ModelAttributeColumnOptions } from "sequelize";

const bootstrap = async () => {
  const modelPath = path.join(__dirname, "./models");

  const sequelize: Sequelize = new Sequelize({
    database: "test_migration",
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
        const parentModel = tableNameModelMap[tableName];
        fkModelMapRow[key] = parentModel;
      }
    }
    fkModelMap[_model.tableName] = fkModelMapRow;
  }

  // console.log(fkModelMap);
  const a = await getModelAndPks(Review, [8, 9], fkModelMap);
  console.log(a);
  // const reviews = await Review.findAll({
  //   where: {
  //     id: {
  //       [Op.in]: [8, 9]
  //     }
  //   }
  // });
  // reviews.forEach((review) => {
  //   // storeId: [1,2,3,4]
  //   // userId:[1]
  //   // 등을 모으기
  //   // review 1,2,3,4,
  //   // store 1,2,3,4
  //   // category 2,3
  //   // 의 array로 리턴
  // });
  // // console.log(reviews[0]);
  // const reviewFkModelMap = fkModelMap[Review.tableName];
  // console.log(reviewFkModelMap);

  // console.log(attributes);

  // const described = await Review.describe();
  // console.log(described);
  // console.log(Review.getTableName());
};

// getModelAndPks = function(){

// }

// table 이름, id 어레이의 쌍 리턴

const getModelAndPks = async (
  model: ModelCtor<Model<any, any>>,
  pks: number[],
  fkModelMap: {
    [attribute: string]: ModelAttributeColumnOptions;
  }
) => {
  console.log("DOOOOO", model, pks);
  const rows = await model.findAll({
    where: {
      id: {
        [Op.in]: pks
      }
    }
  });
  const subParams = {};

  for (let [fkFieldName, modelClass] of Object.entries(
    fkModelMap[model.tableName]
  )) {
    // subParams[modelClass] = [];
    rows
      .filter((row) => row[fkFieldName])
      .forEach((row) => {
        if (subParams[modelClass] === undefined) {
          subParams[modelClass] = [];
        }
        if (subParams[modelClass].indexOf(row[fkFieldName]) < 0) {
          subParams[modelClass].push(row[fkFieldName]);
        }
      });
  }

  console.log(subParams);
  // ids = rows.map((row) => row.id);

  return {
    tableName: model.tableName
    // ids: ids
  };
};

interface aa {
  [key: string]: ModelCtor<Model<any, any>>;
}
interface bb {
  [attribute: string]: ModelAttributeColumnOptions;
}
bootstrap();
