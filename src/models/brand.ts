import { Table, Column, Model, HasMany, AllowNull } from "sequelize-typescript";

@Table
export class Brand extends Model<Brand> {
  @Column
  title: string;

  @AllowNull
  @Column
  description: string;
}
