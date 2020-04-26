import { Op, Sequelize } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  DefaultScope,
  Scopes,
  ScopesOptionsGetter,
  BelongsToMany
} from "sequelize-typescript";
import { MusicOrderbys } from "@src/modules/music/music.enum";
import { Deck } from "./deck.model";
import { DeckMusic } from "./deckMusic.model";

export const MusicScopes: ScopesOptionsGetter = () => ({
  title: (value) => {
    return {
      where: { title: value }
    };
  },
  artist: (value) => {
    return {
      where: { artist: value }
    };
  },
  link: (value) => {
    return {
      where: { link: value }
    };
  },
  averageScore: (value) => {
    return {
      where: { averageScore: value }
    };
  },
  belogsDecksCount: (value) => {
    return {
      where: { belogsDecksCount: value }
    };
  },
  performsCount: (value) => {
    return {
      where: { performsCount: value }
    };
  },
  order: (value) => {
    if (MusicOrderbys[value] == undefined) {
      return {};
    }
    const { cursor, orderBy } = MusicOrderbys[value];
    return {
      attributes: {
        include: [[Sequelize.literal(cursor), "cursor"]]
      },
      order: orderBy
    };
  },
  after: (value, orderbyKey) => {
    if (MusicOrderbys[orderbyKey] == undefined) {
      return {};
    }
    const { cursor, orderBy } = MusicOrderbys[orderbyKey];
    return {
      where: {
        [Op.and]: Sequelize.literal(`${cursor} < ${value}`)
      }
    };
  }
});
@DefaultScope(() => ({
  include: []
}))
@Scopes(MusicScopes)
@Table
export class Music extends Model<Music> {
  @Column({
    type: DataType.STRING(256),
    allowNull: false
  })
  title: string;

  @Column({
    type: DataType.STRING(256),
    allowNull: false
  })
  artist: string;

  @Column({
    type: DataType.STRING(256),
    allowNull: false
  })
  link: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  averageScore: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  belogsDecksCount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  performsCount: number;

  @BelongsToMany(() => Deck, () => DeckMusic)
  decks: Deck[];
}
