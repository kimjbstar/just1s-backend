import { Review } from "./review.model";
import { User } from "./user.model";

import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany
} from "sequelize-typescript";

@Table
export class ReviewReply extends Model<ReviewReply> {
  @ForeignKey(() => Review)
  @Column
  reviewId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @HasMany(() => ReviewReply, {
    as: "children",
    foreignKey: "parentId",
    constraints: false
  })
  children: ReviewReply[];

  @Column
  content: string;
}
