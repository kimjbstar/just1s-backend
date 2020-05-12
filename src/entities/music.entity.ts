import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany
} from "typeorm";
import { DeckMusic } from "./deckMusic.entity";
import { NbaseEntity } from "@src/common/types/nbase-entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Music extends NbaseEntity {
  @ApiProperty()
  @Column({
    default: ""
  })
  title: string;

  @ApiProperty()
  @Column({
    default: ""
  })
  artist: string;

  @ApiProperty()
  @Column({
    default: ""
  })
  link: string;

  @ApiProperty()
  @Column({
    default: ""
  })
  key: string;

  @ApiProperty()
  @Column({
    type: "int",
    default: 0
  })
  averageScore: number;

  @ApiProperty()
  @Column({
    type: "int",
    default: 0
  })
  belogsDecksCount: number;

  @ApiProperty()
  @Column({
    type: "int",
    default: 0
  })
  performsCount: number;

  @OneToMany((type) => DeckMusic, (deckMusic) => deckMusic.music)
  deckMusics: DeckMusic[];

  checkCorrect = (answer: string) => {
    let left = this.title.replace(/[^A-Za-z가-힣0-9]/g, "");
    let right = answer.replace(/[^A-Za-z가-힣0-9]/g, "");
    return left === right;
  };
}
