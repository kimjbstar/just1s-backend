import { NBaseError } from "./../common/nbase-error";
import { ReviewScopes, Review } from "./../models/review.model";
import { getFindScopesFromRequest } from "./../common/util";
export default class ReviewService {
  static async find(req): Promise<object[]> {
    const { scopes, offset, limit } = getFindScopesFromRequest(
      req,
      Object.keys(ReviewScopes())
    );
    const reviews: Review[] = await Review.scope(scopes).findAll({
      offset: offset,
      limit: limit
    });
    return reviews.map(review => review.get({ plain: true }));
  }

  static async findByPk(id): Promise<object> {
    const review: Review = await Review.findByPk(id);
    if (review == null) {
      throw new NBaseError(422, "data not found", "id를 확인해주세요");
    }
    return review;
  }
}
