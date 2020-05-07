import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  ManyToOne
} from "typeorm";
import { Deck } from "./deck.entity";
import { NbaseEntity } from "@src/common/types/nbase-entity";

@Entity()
export class DeckHashtag extends NbaseEntity {
  constructor(obj?: object) {
    super();
    Object.assign(this, obj);
  }

  @PrimaryGeneratedColumn()
  id: number;

  cursor?: number;

  @Column({
    nullable: false,
    default: ""
  })
  hashtag: string;

  @ManyToOne((type) => Deck, (deck) => deck.hashtags)
  deck!: Deck;
}
