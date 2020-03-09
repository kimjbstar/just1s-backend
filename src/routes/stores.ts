import * as express from "express";
import StoreService from "../services/store.service";
require("express-async-errors");

const storesRouter = express.Router();

storesRouter.get("/", async (req, res) => {
  const stores: object[] = await StoreService.find(req.query);
  const result = {
    stores: stores
  };
  res.send(result);
});

storesRouter.get("/:id", async (req, res, next) => {
  const store: Object = await StoreService.findByPk(req.params.id);
  const result = {
    store: store
  };
  res.send(result);
});

export default storesRouter;
