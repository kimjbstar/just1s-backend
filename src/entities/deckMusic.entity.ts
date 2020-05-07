import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Deck } from "./deck.entity";
import { Music } from "./music.entity";
import { Answer } from "./answer.entity";
import { NbaseEntity } from "@src/common/types/nbase-entity";

@Entity()
export class DeckMusic extends NbaseEntity {
  @ManyToOne((type) => Deck, (deck) => deck.deckMusics)
  deck!: Deck;

  @ManyToOne((type) => Music, (music) => music.deckMusics)
  music!: Music;

  @OneToMany((type) => Answer, (answer) => answer.deckMusic)
  answers!: Answer[];

  @Column({
    type: "int",
    default: 0
  })
  second: number;
}
