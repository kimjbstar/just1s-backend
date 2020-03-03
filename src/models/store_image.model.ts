import { Keyword } from "./keyword.model";
import { Store } from "./store.model";

import {
  Table,
  Column,
  Model,
  Default,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull,
  HasMany,
  BelongsToMany
} from "sequelize-typescript";

type StoreImageType = "NORMAL" | "CONTRACT" | "PRICE";

@Table
export class StoreImage extends Model<StoreImage> {
  @ForeignKey(() => Store)
  @Column
  storeId: number;

  @Default("NORMAL")
  @Column(DataType.ENUM("NORMAL", "CONTRACT", "PRICE"))
  type: StoreImageType;

  @Column
  url: string;
}
