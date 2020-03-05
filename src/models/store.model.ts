import { Op, Sequelize } from "sequelize";
import { StoreImage } from "./store_image.model";
import { Keyword } from "./keyword.model";
import { User } from "./user.model";
import { Company } from "./company.model";
import { Category } from "./category.model";
import { CarBrand } from "./car_brand.model";
import {
  Table,
  Column,
  Model,
  Default,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  Scopes,
  DefaultScope,
  ScopesOptionsGetter
} from "sequelize-typescript";

type StoreLevel = "NORMAL" | "AFFILIATE" | "EXCELLENT";
type StoreStatus = "WATING" | "HIDDEN" | "NORMAL" | "DELETED";

const STORE_ORDERBYS = {
  ID__DESC: {
    cursor: "Store.id",
    orderBy: [["id", "desc"]]
  }
  // distance
};

export const STORE_SCOPES: ScopesOptionsGetter = () => ({
  level: value => {
    return {
      where: { level: value }
    };
  },
  status: value => {
    return {
      where: { status: value }
    };
  },
  name: value => {
    return {
      where: { name: value }
    };
  },
  tel: value => {
    return {
      where: { tel: value }
    };
  },
  phoneNumber: value => {
    return {
      where: { phoneNumber: value }
    };
  },
  name__like: value => {
    return {
      where: {
        name: {
          [Op.like]: `%${value}%`
        }
      }
    };
  },
  level__lte: value => {
    return {
      where: {
        level: {
          [Op.lte]: value
        }
      }
    };
  },
  level__gte: value => {
    return {
      where: {
        level: {
          [Op.gte]: value
        }
      }
    };
  },
  level__between: (lte, gte) => {
    return {
      where: {
        level: {
          [Op.gte]: gte,
          [Op.lte]: lte
        }
      }
    };
  },
  user__status: value => {
    return {
      include: [{ model: User, where: { status: value } }]
    };
  },
  category__name: value => {
    return {
      include: [{ model: Category, where: { name: value } }]
    };
  },
  order: value => {
    if (STORE_ORDERBYS[value] == undefined) {
      return {};
    }
    const { cursor, orderBy } = STORE_ORDERBYS[value];
    return {
      attributes: {
        include: [[Sequelize.literal(cursor), "cursor"]]
      },
      order: orderBy
    };
  },
  after: (value, orderbyKey) => {
    if (STORE_ORDERBYS[orderbyKey] == undefined) {
      return {};
    }
    const { cursor, orderBy } = STORE_ORDERBYS[orderbyKey];
    return {
      where: {
        [Op.and]: Sequelize.literal(`${cursor} < ${value}`)
      }
    };
  }
});
@DefaultScope(() => ({
  include: [User, Category]
}))
@Scopes(STORE_SCOPES)
@Table
export class Store extends Model<Store> {
  @Default("NORMAL")
  @Column(DataType.ENUM("NORMAL", "AFFILIATE", "EXCELLENT"))
  level: StoreLevel;

  @Default("NORMAL")
  @Column(DataType.ENUM("WAITING", "HIDDEN", "NORMAL", "DELETED"))
  status: StoreStatus;

  @Column
  name: string;

  @Column
  stringId: string;

  @Column
  tel: string;

  @Column
  phoneNumber: string;

  @Column(DataType.DECIMAL(11, 7))
  lat: string;

  @Column(DataType.DECIMAL(11, 7))
  lng: string;

  @Column
  repImgUrl: string;

  @Column
  desc: string;

  @Column
  descImgUrl: string;

  @Column
  address1: string;

  @Column
  address2: string;

  @Column
  openingHours: string;

  @Column
  likesCount: number;

  @Column
  adminLikesCount: string;

  @Column
  reviewsCount: string;

  @ForeignKey(() => User)
  @Column
  ownerId: number;

  @BelongsTo(() => User)
  owner: User;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @HasMany(() => StoreImage, {
    as: "images",
    foreignKey: "storeId",
    constraints: false
  })
  images: StoreImage[];

  // @BelongsToMany(
  //   () => Keyword,
  //   () => StoreKeyword
  // )
  // keywords: Keyword[];
}
