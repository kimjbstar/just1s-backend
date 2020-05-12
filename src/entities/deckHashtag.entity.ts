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
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class DeckHashtag extends NbaseEntity {
  @ApiProperty()
  @Column({
    nullable: false,
    default: ""
  })
  hashtag: string;

  @ApiProperty({
    type: () => Deck
  })
  @ManyToOne((type) => Deck, (deck) => deck.hashtags)
  deck!: Deck;
}
