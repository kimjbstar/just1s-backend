import { CarModelgroup } from "./car_modelgroup.model";
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

type CarModelSizeType =
  | "SMALL"
  | "SEMI_MEDIUM"
  | "MEDIUM"
  | "SEMI_LARGE"
  | "LARGE"
  | "EXTRA_LARGE";

@Table
export class CarModel extends Model<CarModel> {
  @Column
  name: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isCertified: boolean;

  @Column
  yearBegin: string;

  @Column
  yearEnd: string;

  @Column
  carsCount: number;

  @Default("MEDIUM")
  @Column(
    DataType.ENUM(
      "SMALL",
      "SEMI_MEDIUM",
      "MEDIUM",
      "SEMI_LARGE",
      "LARGE",
      "EXTRA_LARGE"
    )
  )
  sizeType: CarModelSizeType;

  @ForeignKey(() => CarBrand)
  @Column
  carBrandId: number;

  @BelongsTo(() => CarBrand)
  carBrand: CarBrand;

  @ForeignKey(() => CarModelgroup)
  @Column
  carModelgroupId: number;

  @BelongsTo(() => CarModelgroup)
  carModelgroup: CarModelgroup;
}
