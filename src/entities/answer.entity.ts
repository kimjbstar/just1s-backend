import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne
} from "typeorm";
import { Perform } from "./perform.entity";
import { DeckMusic } from "./deckMusic.entity";
import { NbaseEntity } from "@src/common/types/nbase-entity";

@Entity()
export class Answer extends NbaseEntity {
  @ManyToOne((type) => Perform, (perform) => perform.answers)
  perform!: Perform;

  @ManyToOne((type) => DeckMusic, (deckMusic) => deckMusic.answers)
  deckMusic!: DeckMusic;

  @Column({
    default: ""
  })
  answer: string;

  @Column({
    default: false
  })
  isCorrect: boolean;
}
