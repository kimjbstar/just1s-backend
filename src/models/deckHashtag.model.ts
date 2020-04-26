import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import { Deck } from "./deck.model";
import { Hashtag } from "./hashtag.model";

@Table
export class DeckHashtag extends Model<DeckHashtag> {
  @ForeignKey(() => Deck)
  @Column
  deckId: number;

  @ForeignKey(() => Hashtag)
  @Column
  hashtagId: number;
}
