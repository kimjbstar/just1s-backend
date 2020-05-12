import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne
} from "typeorm";
import { Deck } from "./deck.entity";
import { User } from "./user.entity";
import { Answer } from "./answer.entity";
import { NbaseEntity } from "@src/common/types/nbase-entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Perform extends NbaseEntity {
  @ApiProperty({
    type: () => Deck
  })
  @ManyToOne((type) => Deck, (deck) => deck.performs)
  deck!: Deck;

  @ApiProperty({
    type: () => User
  })
  @ManyToOne((type) => User, (user) => user.performs)
  user!: User;

  @ApiProperty({
    type: () => [Answer]
  })
  @OneToMany((type) => Answer, (answer) => answer.perform, {
    cascade: true,
    onDelete: "CASCADE"
  })
  answers: Answer[];
}
