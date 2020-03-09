import { Sequelize } from "sequelize-typescript";
import { NBaseError } from "./common/nbase-error";
import { setPassportConfig } from "./library/passport";
import logger from "./library/winston";
import * as express from "express";
import * as inflection from "inflection";
import * as path from "path";
import * as dotenv from "dotenv";
import * as morgan from "morgan";
import * as passport from "passport";
import storesRouter from "./routes/stores.router";
import reviewsRouter from "./routes/reviews.router";
import authRouter from "./routes/auth.router";
require("express-async-errors");

let sequelize: Sequelize;

const bootstrap = async () => {
  try {
    setEnvrionment();
    await setConnection();
    createServer();
  } catch (err) {
    logger.error("error in create Server");
    logger.error(err);
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
  // sequelize.sync({ alter: true });
};

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
    logger.error(err.stack);
  }
  next();
};

const createServer = async () => {
  logger.info("set Express Server");
  const app = express();
  const PORT = process.env.EXPRESS_PORT;
  app.listen(PORT, function() {
    logger.info(`listening on port ${PORT}...`);
  });

  app.use(passport.initialize());
  await setPassportConfig(passport);
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      res.locals.user = user !== false ? user : null;
      res.locals.isAuthenticated = user !== false;
      res.locals.tokenFailMessage = info ? info.message : "OK";
      return next();
    })(req, res, next);
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/stores", storesRouter);
  app.use("/reviews", reviewsRouter);
  app.use("/auth", authRouter);

  app.get("*", function(req, res, next) {
    next(new NBaseError(404, "page not found", "url을 확인해주세요"));
  });

  app.use((err, req, res, next) => {
    errorHandler(err, req, res, next);
  });
};
bootstrap();
