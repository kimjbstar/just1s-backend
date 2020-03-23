import ReviewService from "../services/review.service";
import * as express from "express";
import Container from "typedi";
require("express-async-errors");

const reviewsRouter: express.Router = express.Router();

reviewsRouter.use(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.locals.modelService = Container.get(ReviewService);
    next();
  }
);

reviewsRouter.get("/", async (req: express.Request, res: express.Response) => {
  const reviews: object[] = await res.locals.modelService.find(req);
  const result = {
    reviews: reviews
  };
  res.json(result);
});

reviewsRouter.get(
  "/:id",
  async (req: express.Request, res: express.Response, next) => {
    const review: Object = await res.locals.modelService.findByPk(req);
    const result = {
      review: review
    };
    res.json(result);
  }
);

reviewsRouter.post(
  "/",
  async (req: express.Request, res: express.Response, next) => {
    const review = await res.locals.modelService.create(req);
    const result = {
      review: review
    };
    res.json(result);
  }
);

reviewsRouter.put(
  "/:id",
  async (req: express.Request, res: express.Response, next) => {
    await res.locals.modelService.update(req);
    const result = {};
    res.json(result);
  }
);

reviewsRouter.delete(
  "/:id",
  async (req: express.Request, res: express.Response, next) => {
    await res.locals.modelService.destroy(req);
    const result = {};
    res.json(result);
  }
);

export default reviewsRouter;
