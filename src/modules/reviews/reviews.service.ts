import { Injectable } from "@nestjs/common";
import { ReviewImage } from "@src/models/review_image.model";
import { ReviewScopes, Review } from "@src/models/review.model";
import { UtilService } from "@src/services/util.service";
import {
  MissingParameterIDException,
  DataNotFoundException,
  MissingBodyToUpdateException,
  UnexpectedDeleteResultException,
  UnexpectedUpdateResultException,
  MissingBodyToCreateException
} from "@src/common/http-exception";

@Injectable()
export class ReviewsService {
  constructor(private readonly utilService: UtilService) {}

  async findNewVer(query): Promise<object[]> {
    const { scopes, offset, limit } = this.utilService.getFindScopesFromQuery(
      query,
      Object.keys(ReviewScopes())
    );
    const reviews: Review[] = await Review.scope(scopes).findAll({
      offset: offset,
      limit: limit
    });
    return reviews.map(review => review.get({ plain: true }));
  }

  async find(req): Promise<object[]> {
    const { scopes, offset, limit } = this.utilService.getFindScopesFromRequest(
      req,
      Object.keys(ReviewScopes())
    );
    const reviews: Review[] = await Review.scope(scopes).findAll({
      offset: offset,
      limit: limit
    });
    return reviews.map(review => review.get({ plain: true }));
  }

  async findByPk(req): Promise<object> {
    if (req.params.id === undefined) {
      throw new MissingParameterIDException();
    }
    const row: Review = await Review.findByPk(req.params.id);
    if (row == null) {
      throw new DataNotFoundException();
    }
    return row;
  }

  async create(req): Promise<object> {
    if (req.body.review === undefined) {
      throw new MissingBodyToCreateException();
    }
    const row = await Review.create(req.body.review, {
      include: [ReviewImage]
    });
    if (row == null) {
      throw new DataNotFoundException();
    }

    return row.get({ plain: true });
  }

  async update(req): Promise<any> {
    if (req.params.id === undefined) {
      throw new MissingParameterIDException();
    }
    if (req.body.review === undefined) {
      throw new MissingBodyToUpdateException();
    }
    const [affectedRowCount] = await Review.update(req.body.review, {
      where: {
        id: req.params.id
      }
    });
    if (affectedRowCount != 1) {
      throw new UnexpectedUpdateResultException();
    }
    return affectedRowCount;
  }

  async destroy(req): Promise<any> {
    if (req.params.id === undefined) {
      throw new MissingParameterIDException();
    }

    const affectedRowCount = await Review.destroy({
      where: {
        id: req.params.id
      }
    });
    if (affectedRowCount != 1) {
      throw new UnexpectedDeleteResultException();
    }
    return affectedRowCount;
  }
}
