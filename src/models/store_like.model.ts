import { User } from "./user.model";
import { Store } from "./store.model";

import { Table, Column, Model, ForeignKey } from "sequelize-typescript";

@Table
export class StoreLike extends Model<StoreLike> {
  @ForeignKey(() => Store)
  @Column
  storeId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
