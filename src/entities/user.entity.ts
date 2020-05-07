import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
  Equal
} from "typeorm";
import { UserSNSType, UserStatus } from "@src/modules/users/users.enum";
import { NbaseEntity } from "@src/common/types/nbase-entity";
import { Perform } from "./perform.entity";
import { Deck } from "./deck.entity";

@Entity()
export class User extends NbaseEntity {
  @Column({
    type: "enum",
    enum: UserSNSType,
    default: UserSNSType.EMAIL
  })
  snsType: UserSNSType;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.NORMAL
  })
  status: UserStatus;

  @Column({
    default: ""
  })
  snsKey: string;

  @Column({
    default: ""
  })
  email: string;

  @Column({
    default: ""
  })
  imgUrl: string;

  @Column({
    default: "",
    nullable: false
  })
  name: string;

  @Column({
    default: 0
  })
  createdDecksCount: number;

  @Column({
    default: 0
  })
  performedMusicsCount: number;

  @Column({
    default: 0
  })
  performedDecksCount: number;

  @Column({
    default: 0
  })
  averageScore: number;

  @OneToMany((type) => Deck, (deck) => deck.user)
  decks?: Deck[];

  @OneToMany((type) => Perform, (perform) => perform.deck)
  performs?: Perform[];
}
