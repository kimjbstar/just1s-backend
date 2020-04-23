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

  async find(query): Promise<object[]> {
    const { scopes, offset, limit } = this.utilService.getFindScopesFromQuery(
      query,
      Object.keys(ReviewScopes())
    );
    const reviews: Review[] = await Review.scope(scopes).findAll({
      offset: offset,
      limit: limit
    });
    return reviews.map((review) => review.get({ plain: true }));
  }

  async findByPk(id): Promise<object> {
    if (id === undefined) {
      throw new MissingParameterIDException();
    }
    const row: Review = await Review.findByPk(id);
    if (row == null) {
      throw new DataNotFoundException();
    }
    return row;
  }

  async create(dto): Promise<object> {
    if (dto === undefined) {
      throw new MissingBodyToCreateException();
    }
    console.log(dto);
    const row = await Review.create(dto, {
      include: [ReviewImage]
    });
    console.log(row);
    if (row == null) {
      throw new DataNotFoundException();
    }

    return row.get({ plain: true });
  }

  async update(id, dto): Promise<any> {
    if (id === undefined) {
      throw new MissingParameterIDException();
    }
    if (dto === undefined) {
      throw new MissingBodyToUpdateException();
    }
    const [affectedRowCount] = await Review.update(dto, {
      where: {
        id: id
      }
    });
    if (affectedRowCount != 1) {
      throw new UnexpectedUpdateResultException();
    }
    return affectedRowCount;
  }

  async destroy(id): Promise<any> {
    if (id === undefined) {
      throw new MissingParameterIDException();
    }

    const affectedRowCount = await Review.destroy({
      where: {
        id: id
      }
    });
    if (affectedRowCount != 1) {
      throw new UnexpectedDeleteResultException();
    }
    return affectedRowCount;
  }
}
