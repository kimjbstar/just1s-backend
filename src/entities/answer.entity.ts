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
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Answer extends NbaseEntity {
  @ApiProperty({
    type: () => Perform
  })
  @ManyToOne((type) => Perform, (perform) => perform.answers)
  perform!: Perform;

  @ApiProperty({
    type: () => DeckMusic
  })
  @ManyToOne((type) => DeckMusic, (deckMusic) => deckMusic.answers)
  deckMusic!: DeckMusic;

  @ApiProperty()
  @Column({
    default: ""
  })
  answer: string;

  @ApiProperty()
  @Column({
    default: false
  })
  isCorrect: boolean;
}
