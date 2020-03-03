import { Review } from "./review.model";
import { User } from "./user.model";

import { Table, Column, Model, ForeignKey } from "sequelize-typescript";

@Table
export class ReviewHit extends Model<ReviewHit> {
  @ForeignKey(() => Review)
  @Column
  reviewId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
