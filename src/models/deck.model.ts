import { Op, Sequelize } from "sequelize";
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
  DefaultScope,
  Scopes,
  ScopesOptionsGetter,
  BelongsToMany
} from "sequelize-typescript";
import { DeckOrderbys } from "@src/modules/decks/deck.enum";
import { User } from "@src/models/user.model";
import { Hashtag } from "./hashtag.model";
import { DeckHashtag } from "./deckHashtag.model";
import { Music } from "./music.model";
import { DeckMusic } from "./deckMusic.model";

export const DeckScopes: ScopesOptionsGetter = () => ({
  title: (value) => {
    return {
      where: { title: value }
    };
  },
  order: (value) => {
    if (DeckOrderbys[value] == undefined) {
      return {};
    }
    const { cursor, orderBy } = DeckOrderbys[value];
    return {
      attributes: {
        include: [[Sequelize.literal(cursor), "cursor"]]
      },
      order: orderBy
    };
  },
  after: (value, orderbyKey) => {
    if (DeckOrderbys[orderbyKey] == undefined) {
      return {};
    }
    const { cursor, orderBy } = DeckOrderbys[orderbyKey];
    return {
      where: {
        [Op.and]: Sequelize.literal(`${cursor} < ${value}`)
      }
    };
  }
});
@DefaultScope(() => ({
  include: [User]
}))
@Scopes(DeckScopes)
@Table
export class Deck extends Model<Deck> {
  @Column({
    type: DataType.STRING(256),
    allowNull: false
  })
  title: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  hitsCount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  averageScore: number;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Hashtag, () => DeckHashtag)
  hashtags: Hashtag[];

  @BelongsToMany(() => Music, () => DeckMusic)
  musics: Music[];
}
