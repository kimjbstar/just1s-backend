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

type UserRole = "NORMAL" | "BUSINESS" | "STAFF" | "ADMIN";
type UserStatus = "NORMAL" | "WITHDRAWN";

@Table
export class User extends Model<User> {
  @Default("NORMAL")
  @Column(DataType.ENUM("NORMAL", "BUSINESS", "STAFF", "ADMIN"))
  role: UserRole;

  @Column
  email: string;

  @Column
  stringId: string;

  @Column
  pw: string;

  @Column
  imgUrl: string;

  @Column
  nickname: string;

  @Column
  name: string;

  @Column
  phoneNumber: string;

  @Column
  desc: string;

  @Default("NORMAL")
  @Column(DataType.ENUM("NORMAL", "WITHDRAWN"))
  status: UserStatus;

  @Column(DataType.DATE)
  blockedUntil: Date;

  @Column(DataType.BOOLEAN)
  toGetPushed: boolean;

  // @BelongsToMany(
  //   () => Car,
  //   () => UserCar
  // )
  // cars: Car[];
}
