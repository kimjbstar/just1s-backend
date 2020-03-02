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

type StoreKeywordStatus = "WATING" | "HIDDEN" | "NORMAL" | "DELETED";

@Table
export class StoreKeyword extends Model<StoreKeyword> {
  @ForeignKey(() => Store)
  @Column
  storeId: number;

  @ForeignKey(() => Keyword)
  @Column
  keywordId: number;

  @Column(DataType.DATEONLY)
  beginDate: Date;

  @Column(DataType.DATEONLY)
  endDate: Date;

  @Default("NORMAL")
  @Column(DataType.ENUM("NORMAL", "DELETED"))
  status: StoreKeywordStatus;
}
