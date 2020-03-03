import { Post } from "./post.model";
import { User } from "./user.model";

import { Table, Column, Model, ForeignKey } from "sequelize-typescript";

@Table
export class PostLike extends Model<PostLike> {
  @ForeignKey(() => Post)
  @Column
  postId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
