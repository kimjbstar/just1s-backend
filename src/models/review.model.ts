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
  Scopes,
  NotEmpty,
  IsUrl,
  HasMany,
  IsNumeric,
  NotNull,
  AllowNull
} from "sequelize-typescript";
import { ReviewImage } from "./review_image.model";

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
  @AllowNull(false)
  @Default("CUSTOMER")
  @Column(DataType.ENUM("CUSTOMER", "STORE"))
  type: ReviewType;

  @NotEmpty
  @AllowNull(false)
  @Default("")
  @Column
  title: string;

  @AllowNull(false)
  @Default("")
  @Column
  content: string;

  @IsNumeric
  @AllowNull(false)
  @Default(0)
  @Column
  workingHours: number;

  @IsNumeric
  @AllowNull(false)
  @Default(0)
  @Column
  price: number;

  @AllowNull(false)
  @Default("")
  @Column
  beforeImgUrl: string;

  @AllowNull(false)
  @Default("")
  @Column
  repImgUrl: string;

  @IsNumeric
  @AllowNull(false)
  @Default(0)
  @Column
  repliesCount: number;

  @IsNumeric
  @AllowNull(false)
  @Default(0)
  @Column
  likesCount: number;

  @IsNumeric
  @AllowNull(false)
  @Default(0)
  @Column
  hitsCount: number;

  @IsNumeric
  @AllowNull(false)
  @Default(0)
  @Column
  adminHitsCount: number;

  @AllowNull(false)
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

  @HasMany(() => ReviewImage, {
    as: "images",
    foreignKey: "reviewId",
    constraints: false
  })
  images: ReviewImage[];
}
