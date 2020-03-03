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

  const params = {
    level__gte: 2,
    limit: 5,
    user_status: "NORMAL",
    category_name: "드레스업",
    orderby: "ID__DESC",
    after: 8512
  };

  let _include = {
    user: {
      model: User
    }
  };
  let _limit = 24;
  let _offset = 0;
  let _where = {};
  let _attributes = {
    include: []
  };
  let _order = [];

  // 전부 resolver로 분리

  // 동일 체크
  const equalParams = ["level", "status", "name", "tel", "phoneNumber"];
  equalParams.forEach(_eqParam => {
    if (params[_eqParam]) {
      if (!_where[_eqParam]) {
        _where[_eqParam] = {};
      }
      _where[_eqParam] = params[_eqParam];
    }
  });

  // 범위체크
  // django convetion 참고
  if (params["level__gte"]) {
    if (!_where["level"]) {
      _where["level"] = {};
    }
    _where["level"][Op.gte] = params["level__gte"];
  }
  if (params["level__lte"]) {
    if (!_where["level"]) {
      _where["level"] = {};
    }
    _where["level"][Op.lte] = params["level__lte"];
  }

  if (params["user_status"]) {
    if (!_include["user"]) {
      _include["user"] = {
        model: User
      };
    }
    if (!_include["user"]["status"]) {
      _include["user"]["status"] = {};
    }
    _include.user["status"] = params["user_status"];
  }
  if (params["category_name"]) {
    if (!_include["category"]) {
      _include["category"] = {
        model: Category
      };
    }
    if (!_include["category"]["name"]) {
      _include["category"]["name"] = {};
    }
    _include["category"]["name"] = params["category_name"];
  }

  // like
  if (params["title__like"]) {
    if (!_where["title"]) {
      _where["title"] = {};
    }
    _where["title"][Op.like] = params["title__like"];
  }

  if (params["orderby"]) {
    let cursor = null;
    if (params["orderby"] == "ID__DESC") {
      cursor = "Store.id";
      _attributes.include.push([Sequelize.literal(cursor), "cursor"]);
      _order = [["id", "desc"]];
    }

    if (params["after"] && cursor) {
      if (!_where[Op.and]) {
        _where[Op.and] = [];
      }
      _where[Op.and].push(Sequelize.literal(`${cursor} < ${params["after"]}`));
    }
  }

  //     }
  //   },
  //   orderByResolver: {
  //     [OnsalecarListOrderBy.ID__DESC]: {
  //       cursor: "onsalecar.id",
  //       orderBy: {
  //         "onsalecar.id": "DESC"
  //       }
  //     },
  //     [OnsalecarListOrderBy.PRICE__DESC]: {
  //       cursor: "onsalecar.price + onsalecar.id/10000",
  //       orderBy: {
  //         "onsalecar.price": "DESC",
  //         "onsalecar.id": "DESC"
  //       }
  //     },
  //     [OnsalecarListOrderBy.PRICE__ASC]: {
  //       cursor: "onsalecar.price + onsalecar.id/10000",
  //       orderBy: {
  //         "onsalecar.price": "ASC",
  //         "onsalecar.id": "ASC"
  //       }
  //     }
  //   }
  // };
  // lat, lng 이건 특별처리

  const findOptions: FindOptions = {
    where: _where,
    attributes: _attributes,
    include: Object.values(_include),
    order: _order,
    limit: _limit,
    offset: _offset
  };
  console.log(findOptions);
  const stores: Store[] = await Store.findAll(findOptions);

  console.dir(sequelizeResultToJson(stores), { depth: 4 });
};

bootstrap();

// 파라미터가 없을 경우 기본처리가 필요할 수도 있다.

// not equel

// join 후 조건

// or이 들어갈수도

// like

// 해당 조건에 따라 where 자체가 분기

// not null 체크

// ** filter -> 여러 조건이 들어감

// ** orderby -> 정렬

// ** mode 개념 넣는다 했지 ( filter, orderby 동시 )
