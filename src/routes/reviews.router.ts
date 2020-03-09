import ReviewService from "../services/review.service";
import * as express from "express";
import * as path from "path";
import { Review } from "./../models/review.model";
import { ReviewImage } from "./../models/review_image.model";
import { NBaseError } from "@src/common/nbase-error";
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

reviewsRouter.post("/", async (req, res, next) => {
  if (req.body.review === undefined) {
    throw new NBaseError(404, "추가할 review가 없습니다.");
  }
  const review = await Review.create(req.body.review, {
    include: [ReviewImage]
  });

  const result = {
    review: review.get({ plain: true })
  };
  res.send(result);
});

reviewsRouter.put("/:id", async (req, res, next) => {
  if (req.params.id === undefined) {
    throw new NBaseError(404, "업데이트할 id가 없습니다.");
  }
  if (req.body.review === undefined) {
    throw new NBaseError(404, "업데이트할 review가 없습니다.");
  }
  const [affectedRowCounts] = await Review.update(req.body.review, {
    where: {
      id: req.params.id
    }
  });

  const result = {
    // count: affectedRowCounts
  };
  res.send(result);
});

export default reviewsRouter;
