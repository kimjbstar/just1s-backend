import { Sequelize } from "sequelize-typescript";
import { Store, STORE_SCOPES } from "./models/store.model";
import * as express from "express";
import { sequelize } from "./sequelize";
import * as figlet from "figlet";
import * as inflection from "inflection";
import * as path from "path";

const PORT = 3000;

const bootstrap = async () => {
  const WELCOME_TEXT = "welcome to nBase";
  figlet(WELCOME_TEXT, (err, data) => {
    console.log(!err ? data : WELCOME_TEXT);

    setConnection();
    createServer();
  });
};

const setConnection = () => {
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
  // sequelize.authenticate()
};

const createServer = () => {
  // load all scopes here ??
  const app = express();
  app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`);
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/stores", async (req, res) => {
    const availableScopes = Object.keys(STORE_SCOPES());
    const scopes = Object.keys(req.query)
      .filter(scope => !["offset", "limit"].includes(scope))
      .filter(scope => availableScopes.includes(scope))
      .reduce((result, key, index) => {
        result.push({
          method: [key, req.query[key]]
        });
        return result;
      }, []);

    const stores: Store[] = await Store.scope(scopes).findAll({
      offset: Number(req.query.offset) || 0,
      limit: Number(req.query.limit) || 5
    });
    const result = {
      stores: stores.map(store => store.get({ plain: true }))
    };
    res.send(result);
  });

  app.get("/stores/:id", async (req, res, next) => {
    const store: Store = await Store.findByPk(req.params.id);
    if (store == null) {
      // TODO : error를 타입별로 관리하고 싶으면 상속
      next(new Error("store가 null이 나왔어요..."));
      return;
    }
    console.log(store);
    const result = {
      store: store.get({ plain: true })
    };
    res.send(result);
  });

  app.get("*", function(req, res, next) {
    // res.status(404).send("what???");
    // TODO : next -> globalHandler에 statusCode 전달 가능하도록 처리
    next(new Error("what??"));
  });

  // app.use 1...
  // app.use 2...
  // // log or something, function moduleize
  // this is error handler(4 params)
  app.use((err, req, res, next) => {
    res.status(500).send({
      status: 500,
      message: err.message,
      name: err.name,
      type: "internal"
    });

    next();
  });
};
bootstrap();
