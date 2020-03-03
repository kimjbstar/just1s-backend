import { StoreImage } from "./store_image.model";
import { Keyword } from "./keyword.model";
import { User } from "./user.model";
import { Company } from "./company.model";
import { Category } from "@src/models/category.model";
import { CarBrand } from "./car_brand.model";
import {
  Table,
  Column,
  Model,
  Default,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasMany
} from "sequelize-typescript";

type StoreLevel = "NORMAL" | "AFFILIATE" | "EXCELLENT";
type StoreStatus = "WATING" | "HIDDEN" | "NORMAL" | "DELETED";

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
