import StoreService from "../services/store.service";
import * as express from "express";
import Container from "typedi";
require("express-async-errors");

const storesRouter: express.Router = express.Router();

storesRouter.use(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.locals.modelService = Container.get(StoreService);
    next();
  }
);

storesRouter.get("/", async (req: express.Request, res: express.Response) => {
  const stores: object[] = await res.locals.modelService.find(req);
  const result = {
    stores: stores
  };
  res.send(result);
});

storesRouter.get(
  "/:id",
  async (req: express.Request, res: express.Response, next) => {
    const store: Object = await res.locals.modelService.findByPk(req);
    const result = {
      store: store
    };
    res.send(result);
  }
);

storesRouter.post(
  "/",
  async (req: express.Request, res: express.Response, next) => {
    const store = await res.locals.modelService.create(req);
    const result = {
      store: store
    };
    res.send(result);
  }
);

storesRouter.put(
  "/:id",
  async (req: express.Request, res: express.Response, next) => {
    await res.locals.modelService.update(req);
    const result = {};
    res.send(result);
  }
);

storesRouter.delete(
  "/:id",
  async (req: express.Request, res: express.Response, next) => {
    await res.locals.modelService.destroy(req);
    const result = {};
    res.send(result);
  }
);

export default storesRouter;
