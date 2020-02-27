import { Product } from "./product";
import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";

@Table
export class Item extends Model<Item> {
  @Column
  name: string;

  @Column
  stockCount: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;
}
