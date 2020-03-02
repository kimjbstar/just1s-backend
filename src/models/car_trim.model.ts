import { CarModel } from "./car_model.model";
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

type CarTrimWd = "UNKNOWN" | "2WD" | "4WD";

@Table
export class CarTrim extends Model<CarTrim> {
  @Column
  name: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isCertified: boolean;

  @Default("UNKNOWN")
  @Column(DataType.ENUM("UNKNOWN", "2WD", "4WD"))
  wd: CarTrimWd;

  @Column
  highestPrice: number;

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

  @ForeignKey(() => CarModel)
  @Column
  carModelId: number;

  @BelongsTo(() => CarModel)
  carModel: CarModel;
}
