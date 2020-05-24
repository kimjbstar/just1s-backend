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
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Deck extends NbaseEntity {
  @ApiProperty()
  @Column({
    default: ""
  })
  title!: string;

  @ApiProperty()
  @Column({
    default: ""
  })
  repImgUrl!: string;

  @ApiProperty()
  @Column({
    type: "int",
    default: 0
  })
  hitsCount: number;

  @ApiProperty()
  @Column({
    type: "int",
    default: 0
  })
  averageScore: number;

  @ApiProperty({
    type: () => User
  })
  @ManyToOne((type) => User, (user) => user.decks)
  user!: User;

  @ApiProperty({
    type: () => [DeckHashtag]
  })
  @OneToMany((type) => DeckHashtag, (hashtag) => hashtag.deck, {
    cascade: true,
    onDelete: "CASCADE"
  })
  hashtags: DeckHashtag[];

  @ApiProperty({
    type: () => [DeckMusic]
  })
  @OneToMany((type) => DeckMusic, (deckMusic) => deckMusic.deck, {
    cascade: true,
    onDelete: "CASCADE"
  })
  deckMusics: DeckMusic[];

  @ApiProperty({
    type: () => [Perform]
  })
  @OneToMany((type) => Perform, (perform) => perform.deck, {
    cascade: true,
    onDelete: "CASCADE"
  })
  performs: Perform[];
}
