import { CarModel } from "./car_model.model";
import { Company } from "./company.model";
import { Car } from "./car.model";
import { User } from "./user.model";
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

type UserCarFuelType =
  | "UNKNOWN"
  | "GOOD_GASOLINE"
  | "GASOLINE"
  | "DIESEL"
  | "LPG"
  | "HYBRID"
  | "EV";

@Table
export class UserCar extends Model<UserCar> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => CarModel)
  @Column
  carModelId: number;

  @Column
  carNumber: string;

  @Default("UNKNOWN")
  @Column(
    DataType.ENUM(
      "UNKNOWN",
      "GOOD_GASOLINE",
      "GASOLINE",
      "DIESEL",
      "LPG",
      "HYBRID",
      "EV"
    )
  )
  fuelType: UserCarFuelType;

  @Column
  carYearMonth: string;

  @Column
  mileage: number;

  @Column(DataType.DATEONLY)
  insrExpiredDate: Date;

  @ForeignKey(() => Company)
  @Column
  insrCompanyId: number;

  @BelongsTo(() => Company)
  insrCompany: Company;
}
