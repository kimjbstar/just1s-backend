import { ReviewCategory } from "./review_category.model";
import { User } from "./user.model";
import { Keyword } from "./keyword.model";
import { Store } from "./store.model";

import {
  Table,
  Column,
  Model,
  Default,
  DataType,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";
import { CarModel } from "./car_model.model";

type ReviewStatus = "HIDDEN" | "NORMAL";

type ReviewType = "CUSTOMER" | "STORE";

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
