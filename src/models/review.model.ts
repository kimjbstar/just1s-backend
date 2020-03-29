import { Op, Sequelize } from "sequelize";
import { ReviewCategory } from "@src/models/review_category.model";
import { User } from "@src/models/user.model";
import { Store } from "@src/models/store.model";
import { CarModel } from "@src/models/car_model.model";
import { ReviewStatus, ReviewType, ReviewOrderbys } from "@src/enums/review";

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
  HasMany,
  IsNumeric,
  AllowNull,
  NotContains
} from "sequelize-typescript";
import { ReviewImage } from "./review_image.model";

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
  price__gte: value => {
    return {
      where: {
        price: {
          [Op.gte]: value
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
    if (ReviewOrderbys[value] == undefined) {
      return {};
    }
    const { cursor, orderBy } = ReviewOrderbys[value];
    return {
      attributes: {
        include: [[Sequelize.literal(cursor), "cursor"]]
      },
      order: orderBy
    };
  },
  after: (value, orderbyKey) => {
    if (ReviewOrderbys[orderbyKey] == undefined) {
      return {};
    }
    const { cursor, orderBy } = ReviewOrderbys[orderbyKey];
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
@Table({
  timestamps: true
})
export class Review extends Model<Review> {
  @AllowNull(false)
  @Default("CUSTOMER")
  @Column(
    DataType.ENUM({
      values: Object.values(ReviewType)
    })
  )
  type: ReviewType;

  @NotEmpty
  @NotContains({ msg: "광고는 포함되선 안됩니다.", args: "광고" })
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
  @Column(DataType.ENUM({ values: Object.values(ReviewStatus) }))
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
