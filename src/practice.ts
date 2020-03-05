import { ModelHelper } from "./common/model-helper";

import { User } from "./models/user.model";
import { StoreImage } from "./models/store_image.model";
import { Category } from "./models/category.model";
import { Sequelize } from "sequelize-typescript";
import { Store } from "./models/store.model";
import { sequelize } from "./sequelize";
import * as inflection from "inflection";
import * as path from "path";
import { Model, FindOptions } from "sequelize/types";
import { Op } from "sequelize";

const sequelizeResultToJson = (rows: Model[]) => {
  return rows.map(el => el.get({ plain: true }));
};

const bootstrap = async () => {
  const modelPath = path.join(__dirname, "./models");

  const dstConnection = new Sequelize({
    database: "nbase",
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
    timezone: "+09:00"
  });

  // from qs
  const params = {
    category__name: "드레스업",
    level__gte: 1,
    level__lte: 3,
    order: "ID__DESC"
  };

  let _limit = 2;
  let _offset = 0;
  const stores = await Store.scope([
    { method: ["level", 3] },
    { method: ["order", "ID__DESC"] }
  ]).findAll({
    offset: _offset,
    limit: _limit
  });
  console.log(stores);
};

bootstrap();

// 파라미터가 없을 경우 기본처리가 필요할 수도 있다.

// not equel

// join 후 조건

// not null 체크

// ** filter -> 여러 조건이 들어감

// ** orderby -> 정렬

// ** mode 개념 넣는다 했지 ( filter, orderby 동시 )
