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
    defaultValue: 0
  })
  hitsCount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  averageScore: number;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => DeckHashtag)
  hashtags: DeckHashtag[];

  @BelongsToMany(() => Music, () => DeckMusic)
  musics: Array<Music & { DeckMusic: DeckMusic }>;
}

// User.findAll({
//   include: [{
//     model: Project,
//     through: {
//       attributes: ['createdAt', 'startedAt', 'finishedAt'],
//       where: {completed: true}
//     }
//   }]
// });
