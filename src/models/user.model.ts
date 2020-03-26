import { Op } from "sequelize";
import { Sequelize } from "sequelize";
import { UserCar } from "@src/models/user_car.model";
import { Car } from "@src/models/car.model";
import {
  Table,
  Column,
  Model,
  Default,
  DataType,
  BelongsToMany,
  ScopesOptionsGetter,
  Scopes
} from "sequelize-typescript";

type UserRole = "NORMAL" | "BUSINESS" | "STAFF" | "ADMIN";
type UserStatus = "NORMAL" | "WITHDRAWN";

const USER_ORDERBYS = {
  ID__DESC: {
    cursor: "User.id",
    orderBy: [["id", "desc"]]
  }
};

export const UserScopes: ScopesOptionsGetter = () => ({
  status: value => {
    return {
      where: { status: value }
    };
  },
  email__like: value => {
    return {
      where: {
        email: {
          [Op.like]: `%${value}%`
        }
      }
    };
  },
  order: value => {
    if (USER_ORDERBYS[value] == undefined) {
      return {};
    }
    const { cursor, orderBy } = USER_ORDERBYS[value];
    return {
      attributes: {
        include: [[Sequelize.literal(cursor), "cursor"]]
      },
      order: orderBy
    };
  },
  after: (value, orderbyKey) => {
    if (USER_ORDERBYS[orderbyKey] == undefined) {
      return {};
    }
    const { cursor, orderBy } = USER_ORDERBYS[orderbyKey];
    return {
      where: {
        [Op.and]: Sequelize.literal(`${cursor} < ${value}`)
      }
    };
  }
});
@Scopes(UserScopes)
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
