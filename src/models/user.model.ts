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
  UserStatus,
  UserSNSType
} from "@src/modules/users/users.enum";

export const UserScopes: ScopesOptionsGetter = () => ({
  snsType: (value) => {
    return {
      where: { snsType: value }
    };
  },
  status: (value) => {
    return {
      where: { status: value }
    };
  },
  name__like: (value) => {
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
  @Column(DataType.ENUM({ values: Object.values(UserSNSType) }))
  snsType: UserSNSType;

  @Default("NORMAL")
  @Column(DataType.ENUM({ values: Object.values(UserStatus) }))
  status: UserStatus;

  @Column
  snsKey: string;

  @Column
  email: string;

  @Column
  imgUrl: string;

  @Column({
    allowNull: false
  })
  name: string;

  @Column({
    defaultValue: 0
  })
  createdDecksCount: number;

  @Column({
    defaultValue: 0
  })
  performedMusicsCount: number;

  @Column({
    defaultValue: 0
  })
  performedDecksCount: number;

  @Column
  averageScore: number;
}
