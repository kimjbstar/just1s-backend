import { User } from "./user.model";
import { Keyword } from "./keyword.model";
import { Store } from "./store.model";

import {
  Table,
  Column,
  Model,
  Default,
  DataType,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";

type PostType = "FREE" | "NOTICE" | "HELP" | "FAQ" | "TERM" | "STORY";
type PostSubType = "UNKNOWN" | "NEWS" | "LIFE" | "CARRING_TV" | "MOTOR_SPORTS";
type PostStatus = "HIDDEN" | "NORMAL";

@Table
export class Post extends Model<Post> {
  @Default("FREE")
  @Column(DataType.ENUM("FREE", "NOTICE", "HELP", "FAQ", "TERM", "STORY"))
  type: PostType;

  @Default("UNKNOWN")
  @Column(
    DataType.ENUM("UNKNOWN", "NEWS", "LIFE", "CARRING_TV", "MOTOR_SPORTS")
  )
  subType: PostSubType;

  @Default("NORMAL")
  @Column(DataType.ENUM("NORMAL", "HIDDEN"))
  status: PostStatus;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  title: string;

  @Column
  content: string;

  @Column
  repImgUrl: string;

  @Column
  link: string;

  @Column
  repliesCount: number;

  @Column
  likesCount: number;

  @Column
  hitsCount: number;

  @Column
  adminHitsCount: number;
}
