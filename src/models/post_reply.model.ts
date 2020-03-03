import { Post } from "./post.model";
import { User } from "./user.model";

import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany
} from "sequelize-typescript";

@Table
export class PostReply extends Model<PostReply> {
  @ForeignKey(() => Post)
  @Column
  postId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @HasMany(() => PostReply, {
    as: "children",
    foreignKey: "parentId",
    constraints: false
  })
  children: PostReply[];

  @Column
  content: string;
}
