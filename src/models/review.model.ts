import { Op, Sequelize } from "sequelize";
import { ReviewCategory } from "./review_category.model";
import { User } from "./user.model";
import { Store } from "./store.model";
import { CarModel } from "./car_model.model";

import {
  Table,
  Column,
  Model,
  Default,
  DataType,
  ForeignKey,
  BelongsTo,
  ScopesOptionsGetter,
  DefaultScope,
  Scopes
} from "sequelize-typescript";

type ReviewStatus = "HIDDEN" | "NORMAL";
type ReviewType = "CUSTOMER" | "STORE";

const REVIEW_ORDERBYS = {
  ID__DESC: {
    cursor: "Review.id",
    orderBy: [["id", "desc"]]
  }
};

export const ReviewScopes: ScopesOptionsGetter = () => ({
  status: value => {
    return {
      where: { status: value }
    };
  },
  type: value => {
    return {
      where: { type: value }
    };
  },
  title__like: value => {
    return {
      where: {
        title: {
          [Op.like]: `%${value}%`
        }
      }
    };
  },
  user__status: value => {
    return {
      include: [{ model: User, where: { status: value } }]
    };
  },
  user__name: value => {
    return {
      include: [{ model: User, where: { name: value } }]
    };
  },
  order: value => {
    if (REVIEW_ORDERBYS[value] == undefined) {
      return {};
    }
    const { cursor, orderBy } = REVIEW_ORDERBYS[value];
    return {
      attributes: {
        include: [[Sequelize.literal(cursor), "cursor"]]
      },
      order: orderBy
    };
  },
  after: (value, orderbyKey) => {
    if (REVIEW_ORDERBYS[orderbyKey] == undefined) {
      return {};
    }
    const { cursor, orderBy } = REVIEW_ORDERBYS[orderbyKey];
    return {
      where: {
        [Op.and]: Sequelize.literal(`${cursor} < ${value}`)
      }
    };
  }
});
@DefaultScope(() => ({
  include: [ReviewCategory, Store, User]
}))
@Scopes(ReviewScopes)
@Table
export class Review extends Model<Review> {
  @Default("CUSTOMER")
  @Column(DataType.ENUM("CUSTOMER", "STORE"))
  type: ReviewType;

  @Column
  title: string;

  @Column
  content: string;

  @Column
  workingHours: number;

  @Column
  price: number;

  @Column
  beforeImgUrl: string;

  @Column
  repImgUrl: string;

  @Column
  repliesCount: number;

  @Column
  likesCount: number;

  @Column
  hitsCount: number;

  @Column
  adminHitsCount: number;

  @Default("NORMAL")
  @Column(DataType.ENUM("NORMAL", "HIDDEN"))
  status: ReviewStatus;

  @ForeignKey(() => CarModel)
  carModelId: CarModel;

  @BelongsTo(() => CarModel)
  carModel: CarModel;

  @ForeignKey(() => ReviewCategory)
  reviewCategoryId: ReviewCategory;

  @BelongsTo(() => ReviewCategory)
  reviewCategory: ReviewCategory;

  @ForeignKey(() => User)
  userId: User;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Store)
  storeId: Store;

  @BelongsTo(() => Store)
  store: Store;
}
