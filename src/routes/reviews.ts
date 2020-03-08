import { ReviewScopes, Review } from "./../models/review.model";
import { NBaseError } from "./../common/nbase-error";
import logger from "../common/winston";
import * as express from "express";
const reviewsRouter = express.Router();

reviewsRouter.get("/", async (req, res) => {
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

reviewsRouter.get("/:id", async (req, res, next) => {
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

export default reviewsRouter;
