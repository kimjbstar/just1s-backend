import { CarBrand } from "./car_brand.model";
import {
  Table,
  Column,
  Model,
  Default,
  DataType,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";

@Table
export class CarModelgroup extends Model<CarModelgroup> {
  @Column
  name: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isCertified: boolean;

  @Column
  carsCount: number;

  @Column
  encarCode: string;

  @Column
  orderNo: number;

  @ForeignKey(() => CarBrand)
  @Column
  carBrandId: number;

  @BelongsTo(() => CarBrand)
  carBrand: CarBrand;
}
