import { Brand } from "./brand";
import { Item } from "./item";
import {
  Table,
  Column,
  Model,
  HasMany,
  AllowNull,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";

@Table
export class Product extends Model<Product> {
  @Column
  title: string;

  @AllowNull
  @Column
  description: string;

  @ForeignKey(() => Brand)
  @Column
  brandId: number;

  @BelongsTo(() => Brand)
  product: Brand;

  @HasMany(() => Item)
  items: Item[];
}
