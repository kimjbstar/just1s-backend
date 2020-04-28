import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import { Deck } from "./deck.model";

@Table
export class DeckHashtag extends Model<DeckHashtag> {
  @ForeignKey(() => Deck)
  @Column
  deckId: number;

  @Column({
    allowNull: false,
    defaultValue: ""
  })
  hashtag: string;
}
