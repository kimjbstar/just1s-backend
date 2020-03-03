import { Post } from "./post.model";
import { Keyword } from "./keyword.model";
import { Store } from "./store.model";

import {
  Table,
  Column,
  Model,
  Default,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull,
  HasMany,
  BelongsToMany
} from "sequelize-typescript";

@Table
export class PostImage extends Model<PostImage> {
  @ForeignKey(() => Post)
  @Column
  postId: number;

  @Column
  url: string;
}
