import { Table, Column, Model, Default, DataType } from "sequelize-typescript";

type CategoryType = "ACTIVE" | "DELETED" | "PENDING";
type CategoryStatus = "ENABLED" | "DISABLED";

@Table
export class Category extends Model<Category> {
  @Default("STORE")
  @Column(DataType.ENUM("STORE", "COMPANY", "STORE_COMPANY"))
  type: CategoryType;

  @Column
  name: string;

  @Column
  orderNo: number;

  @Default("ENABLED")
  @Column(DataType.ENUM("ENABLED", "DISABLED"))
  status: CategoryStatus;

  @Column
  storesCount: number;

  @Column
  companiesCount: number;
}
