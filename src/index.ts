import { NBaseError } from "./common/nbase-error";
import { Sequelize } from "sequelize-typescript";
import { Store, STORE_SCOPES } from "./models/store.model";
import * as express from "express";
import * as inflection from "inflection";
import * as path from "path";
import * as dotenv from "dotenv";
import * as morgan from "morgan";
import logger from "./common/winston";

require("express-async-errors");

const PORT = 3000;
let sequelize: Sequelize;

const bootstrap = async () => {
  try {
    setEnvrionment();
    await setConnection();
    createServer();
  } catch (err) {
    logger.error("error in create Server");
    console.log(err);
  }
};

const setEnvrionment = () => {
  logger.info("set Environment");
  const result = dotenv.config({
    path: path.resolve(__dirname, `../config/${process.env.NODE_ENV}.env`)
  });
  if (result.error) {
    throw result.error;
  }
};

const setConnection = async () => {
  logger.info("set Sequelize connection");
  const modelPath = path.join(__dirname, "./models");

  sequelize = new Sequelize({
    database: process.env.SEQUELIZE_DATABASE,
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    host: process.env.SEQUELIZE_HOST,
    dialect: "mysql",
    models: [modelPath],
    modelMatch: (_filename, _member) => {
      const filename = inflection.camelize(_filename.replace(".model", ""));
      const member = _member;
      return filename === member;
    },
    timezone: "+09:00"
  });
  await sequelize.authenticate();
};

const createServer = () => {
  logger.info("set Express Server");
  // load all scopes here ??
  const app = express();
  app.listen(PORT, function() {
    // console.clear();
    logger.info(`listening on port ${PORT}...`);
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  const errorHandler = (err: Error, req, res, next) => {
    if (err instanceof NBaseError) {
      res.status(err.statusCode).send(err.toJSON());
    } else {
      res.status(500).send({
        status: 500,
        message: err.message,
        name: err.name,
        stack: err.stack
      });
    }
    next();
  };

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
      next(new NBaseError(422, "data not found", "id를 확인해주세요"));
      return;
    }
    logger.info(store);
    const result = {
      store: store.get({ plain: true })
    };
    res.send(result);
  });

  app.get("*", function(req, res, next) {
    next(new NBaseError(404, "page not found", "url을 확인해주세요"));
  });

  // app.use 1...
  // app.use 2...
  // // log or something, function moduleize
  app.use((err, req, res, next) => {
    errorHandler(err, req, res, next);
  });
};
bootstrap();
