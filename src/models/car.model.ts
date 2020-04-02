import { CarTrim } from "./car_trim.model";
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
  BelongsTo,
  AllowNull
} from "sequelize-typescript";
import { BlobDataTypeOptions } from "sequelize/types";

@Table
export class Car extends Model<Car> {
  @Column
  fullName: string;

  @Column
  brandName: string;

  @Column
  modelgroupName: string;

  @Column
  modelName: string;

  @Column
  trimName: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isCertified: boolean;

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

  @ForeignKey(() => CarTrim)
  @Column
  carTrimId: number;

  @BelongsTo(() => CarTrim)
  carTrim: CarModel;

  // @BelongsToMany(
  //   () => User,
  //   () => UserCar
  // )
  // users: User[];
}
