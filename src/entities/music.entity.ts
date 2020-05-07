import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany
} from "typeorm";
import { DeckMusic } from "./deckMusic.entity";
import { NbaseEntity } from "@src/common/types/nbase-entity";

@Entity()
export class Music extends NbaseEntity {
  @Column({
    default: ""
  })
  title: string;

  @Column({
    default: ""
  })
  artist: string;

  @Column({
    default: ""
  })
  link: string;

  @Column({
    default: ""
  })
  key: string;

  @Column({
    type: "int",
    default: 0
  })
  averageScore: number;

  @Column({
    type: "int",
    default: 0
  })
  belogsDecksCount: number;

  @Column({
    type: "int",
    default: 0
  })
  performsCount: number;

  @OneToMany((type) => DeckMusic, (deckMusic) => deckMusic.music)
  deckMusics: DeckMusic[];
}
