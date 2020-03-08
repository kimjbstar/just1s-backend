import { Sequelize } from "sequelize-typescript";
import { NBaseError } from "./common/nbase-error";
import { Store, StoreScopes } from "./models/store.model";
import { Review, ReviewScopes } from "./models/review.model";
import * as express from "express";
import * as inflection from "inflection";
import * as path from "path";
import * as dotenv from "dotenv";
import * as morgan from "morgan";
import { setPassportConfig } from "./library/passport";
import logger from "./common/winston";
import * as passport from "passport";
import * as jwt from "jsonwebtoken";
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
  // load all scopes here ??
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

  app.get("/stores", async (req, res) => {
    const availableScopes = Object.keys(StoreScopes());
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

  app.get("/reviews", async (req, res) => {
    const availableScopes = Object.keys(ReviewScopes());
    const scopes = Object.keys(req.query)
      .filter(scope => !["offset", "limit"].includes(scope))
      .filter(scope => {
        return availableScopes.includes(scope);
      })
      .reduce((result, key, index) => {
        result.push({
          method: [key, req.query[key]]
        });
        return result;
      }, []);

    const reviews: Review[] = await Review.scope(scopes).findAll({
      offset: Number(req.query.offset) || 0,
      limit: Number(req.query.limit) || 5
    });
    const result = {
      reviews: reviews.map(review => review.get({ plain: true }))
    };
    res.send(result);
  });

  app.get("/reviews/:id", async (req, res, next) => {
    const review: Review = await Review.findByPk(req.params.id);
    if (review == null) {
      next(new NBaseError(422, "data not found", "id를 확인해주세요"));
      return;
    }
    logger.info(review);
    const result = {
      review: review.get({ plain: true })
    };
    res.send(result);
  });

  // TODO : post로 변경
  app.get("/auth/login", async (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: "Error occured in authenticate",
          user: user
        });
      }
      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err);
        }
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "1d"
        });
        res.cookie("jwt", token);
        return res.json({ user, token });
      });
      return {};
    })(req, res);
  });

  app.get("/auth/whoami", async (req, res, next) => {
    if (res.locals.isAuthenticated === false) {
      next(new NBaseError(401, "token 인증 실패", res.locals.tokenFailMessage));
      return;
    }
    res.send({
      user: res.locals.user.get()
    });
  });

  app.get("*", function(req, res, next) {
    next(new NBaseError(404, "page not found", "url을 확인해주세요"));
  });

  app.use((err, req, res, next) => {
    errorHandler(err, req, res, next);
  });
};
bootstrap();
