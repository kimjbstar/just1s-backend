import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";
import { Deck } from "./deck.model";
import { Music } from "./music.model";

@Table
export class DeckMusic extends Model<DeckMusic> {
  @ForeignKey(() => Deck)
  @Column
  deckId: number;

  @ForeignKey(() => Music)
  @Column
  musicId: number;

  @BelongsTo(() => Deck)
  deck: Deck;

  @BelongsTo(() => Music)
  music: Music;

  @Column
  second: number;
}
