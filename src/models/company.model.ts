import { Category } from "./category.model";
import {
  Table,
  Column,
  Model,
  Default,
  DataType,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";
type CompanyNationality = "UNKNOWN" | "DOMESTIC" | "OVERSEAS";

@Table
export class Company extends Model<Company> {
  @Column
  name: string;

  @Default("DOMESTIC")
  @Column(DataType.ENUM("UNKNOWN", "DOMESTIC", "OVERSEAS"))
  nationality: CompanyNationality;

  @Column
  repPhoneNumber: string;

  @Column
  imgUrl: string;

  @Column
  titleImgUrl: string;

  @Column
  sampleImgUrl: string;

  @Column
  linkUrl: string;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
