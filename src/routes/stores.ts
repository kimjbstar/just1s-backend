import { NBaseError } from "./../common/nbase-error";
import { StoreScopes, Store } from "./../models/store.model";
import logger from "../common/winston";
import * as express from "express";
const storesRouter = express.Router();

storesRouter.get("/", async (req, res) => {
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

storesRouter.get("/:id", async (req, res, next) => {
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

export default storesRouter;
