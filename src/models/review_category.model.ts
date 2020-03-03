import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany
} from "sequelize-typescript";

@Table
export class ReviewCategory extends Model<ReviewCategory> {
  @Column
  name: string;

  @HasMany(() => ReviewCategory, {
    as: "children",
    foreignKey: "parentId",
    constraints: false
  })
  children: ReviewCategory[];
}
