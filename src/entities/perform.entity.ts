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

@Entity()
export class Perform extends NbaseEntity {
  @ManyToOne((type) => Deck, (deck) => deck.performs)
  deck!: Deck;

  @ManyToOne((type) => User, (user) => user.performs)
  user!: User;

  @OneToMany((type) => Answer, (answer) => answer.perform, {
    cascade: true,
    onDelete: "CASCADE"
  })
  answers: Answer[];
}
