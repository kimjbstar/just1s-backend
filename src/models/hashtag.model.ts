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
import { HashtagOrderbys } from "@src/modules/hashtags/hashtag.enum";
import { DeckHashtag } from "./deckHashtag.model";
import { Deck } from "./deck.model";

export const HashtagScopes: ScopesOptionsGetter = () => ({
  name: (value) => {
    return {
      where: { name: value }
    };
  },
  order: (value) => {
    if (HashtagOrderbys[value] == undefined) {
      return {};
    }
    const { cursor, orderBy } = HashtagOrderbys[value];
    return {
      attributes: {
        include: [[Sequelize.literal(cursor), "cursor"]]
      },
      order: orderBy
    };
  },
  after: (value, orderbyKey) => {
    if (HashtagOrderbys[orderbyKey] == undefined) {
      return {};
    }
    const { cursor, orderBy } = HashtagOrderbys[orderbyKey];
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
@Scopes(HashtagScopes)
@Table
export class Hashtag extends Model<Hashtag> {
  @Column({
    type: DataType.STRING(256),
    allowNull: false
  })
  name: string;

  @BelongsToMany(() => Deck, () => DeckHashtag)
  decks: Deck[];
}
