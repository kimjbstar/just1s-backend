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
import { Category } from "./category.model";

type KeywordStatus = "ENABLED" | "DISABLED";

@Table
export class Keyword extends Model<Keyword> {
  @Column
  name: string;

  @Column
  imgUrl: string;

  @Default("ENABLED")
  @Column(DataType.ENUM("ENABLED", "DISABLED"))
  status: KeywordStatus;

  @Column
  orderNo: string;

  @Column
  storesCount: string;

  @HasMany(() => Keyword, {
    as: "children",
    foreignKey: "parentId",
    constraints: false
  })
  children: Keyword[];

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  // @BelongsToMany(
  //   () => Store,
  //   () => StoreKeyword
  // )
  // keywords: Store[];
}
