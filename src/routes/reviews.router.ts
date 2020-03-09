import * as express from "express";
import ReviewService from "../services/review.service";
require("express-async-errors");

const reviewsRouter = express.Router();

reviewsRouter.get("/", async (req, res) => {
  const reviews: object[] = await ReviewService.find(req);
  const result = {
    reviews: reviews
  };
  res.send(result);
});

reviewsRouter.get("/:id", async (req, res, next) => {
  const review: Object = await ReviewService.findByPk(req.params.id);
  const result = {
    review: review
  };
  res.send(result);
});

export default reviewsRouter;
