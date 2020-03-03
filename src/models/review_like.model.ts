import { Review } from "./review.model";
import { User } from "./user.model";

import { Table, Column, Model, ForeignKey } from "sequelize-typescript";

@Table
export class ReviewLike extends Model<ReviewLike> {
  @ForeignKey(() => Review)
  @Column
  reviewId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
