import { Post } from "./post.model";
import { User } from "./user.model";

import { Table, Column, Model, ForeignKey } from "sequelize-typescript";

@Table
export class PostHit extends Model<PostHit> {
  @ForeignKey(() => Post)
  @Column
  postId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column
  ipAddress: string;
}
