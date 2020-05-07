import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne
} from "typeorm";
import { DeckHashtag } from "./deckHashtag.entity";
import { DeckMusic } from "./deckMusic.entity";
import { Perform } from "./perform.entity";
import { User } from "./user.entity";
import { NbaseEntity } from "@src/common/types/nbase-entity";

@Entity()
export class Deck extends NbaseEntity {
  @Column({
    default: ""
  })
  title!: string;

  @Column({
    type: "int",
    default: 0
  })
  hitsCount: number;

  @Column({
    type: "int",
    default: 0
  })
  averageScore: number;

  @ManyToOne((type) => User, (user) => user.decks)
  user!: User;

  @OneToMany((type) => DeckHashtag, (hashtag) => hashtag.deck, {
    cascade: true,
    onDelete: "CASCADE"
  })
  hashtags: DeckHashtag[];

  @OneToMany((type) => DeckMusic, (deckMusic) => deckMusic.deck, {
    cascade: true,
    onDelete: "CASCADE"
  })
  deckMusics: DeckMusic[];

  @OneToMany((type) => Perform, (perform) => perform.deck, {
    cascade: true,
    onDelete: "CASCADE"
  })
  performs: Perform[];
}
