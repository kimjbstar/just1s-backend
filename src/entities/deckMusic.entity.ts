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
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class DeckMusic extends NbaseEntity {
  @ApiProperty({
    type: () => Deck
  })
  @ManyToOne((type) => Deck, (deck) => deck.deckMusics)
  deck!: Deck;

  @ApiProperty({
    type: () => Music
  })
  @ManyToOne((type) => Music, (music) => music.deckMusics)
  music!: Music;

  @ApiProperty({
    type: () => Answer
  })
  @OneToMany((type) => Answer, (answer) => answer.deckMusic)
  answers: Answer[];

  @ApiProperty()
  @Column({
    type: "int",
    default: 0
  })
  second: number;
}
