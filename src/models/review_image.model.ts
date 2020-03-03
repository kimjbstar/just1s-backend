import { Review } from "./review.model";

import { Table, Column, Model, ForeignKey } from "sequelize-typescript";

@Table
export class ReviewImage extends Model<ReviewImage> {
  @ForeignKey(() => Review)
  @Column
  reviewId: number;

  @Column
  url: string;
}
