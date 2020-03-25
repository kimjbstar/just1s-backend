import { Sequelize } from "sequelize-typescript";
import { setConnection } from "@src/common/sequelize";
import { setPassportConfig } from "@src/library/passport";
import logger from "@src/library/winston";
import * as express from "express";
import * as morgan from "morgan";
import * as passport from "passport";
import storesRouter from "@src/routes/stores.router";
import reviewsRouter from "@src/routes/reviews.router";
import authRouter from "@src/routes/auth.router";
import * as child_process from "child_process";
import { NBaseError } from "@src/common/nbase-error";
require("express-async-errors");

let sequelize: Sequelize;

const bootstrap = async () => {
  try {
    // setEnvrionment();
    sequelize = await setConnection();
    // sequelize.sync({ alter: true });
    createServer();
  } catch (err) {
    logger.error("error in create Server1 ");
    logger.error(err);
  }
};

// const setEnvrionment = () => {
//   logger.info("set Environment");
//   const env = process.env.NODE_ENV || "development";
//   // const env = "development";
//   const result = dotenv.config({
//     path: path.resolve(__dirname, `../config/${env}.env`)
//   });
//   if (result.error) {
//     throw result.error;
//   }
// };

const errorHandler = (err: Error, req, res, next) => {
  if (err instanceof NBaseError) {
    res.status(err.statusCode).json(err.toJSON());
  } else {
    res.status(500).json({
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
    res.send("Hello World !! 2345");
  });

  app.get("/whoami", (req: express.Request, res: express.Response) => {
    const execSync = child_process.execSync;
    const code = execSync("node -v");
    const whoami = execSync("whoami");
    const hostname = execSync("hostname");
    const result = {
      code: code.toString().replace("\n", ""),
      whoami: whoami.toString().replace("\n", ""),
      hostname: hostname.toString().replace("\n", "")
    };
    res.json(result);
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
