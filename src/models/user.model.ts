import { Op } from "sequelize";
import { Sequelize } from "sequelize";
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
import {
  UserOrderbys,
  UserRole,
  UserStatus
} from "@src/modules/users/users.enum";

export const UserScopes: ScopesOptionsGetter = () => ({
  role: (value) => {
    return {
      where: { role: value }
    };
  },
  status: (value) => {
    return {
      where: { status: value }
    };
  },
  email__like: (value) => {
    return {
      where: {
        email: {
          [Op.like]: `%${value}%`
        }
      }
    };
  },
  order: (value) => {
    if (UserOrderbys[value] == undefined) {
      return {};
    }
    const { cursor, orderBy } = UserOrderbys[value];
    return {
      attributes: {
        include: [[Sequelize.literal(cursor), "cursor"]]
      },
      order: orderBy
    };
  },
  after: (value, orderbyKey) => {
    if (UserOrderbys[orderbyKey] == undefined) {
      return {};
    }
    const { cursor, orderBy } = UserOrderbys[orderbyKey];
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
  @Column(DataType.ENUM({ values: Object.values(UserRole) }))
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
  @Column(DataType.ENUM({ values: Object.values(UserStatus) }))
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
