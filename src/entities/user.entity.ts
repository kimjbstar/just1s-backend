import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
  Equal,
  BeforeUpdate,
  BeforeInsert,
  AfterLoad,
  AfterUpdate
} from "typeorm";
import {
  UserSNSType,
  UserStatus,
  UserRole
} from "@src/modules/users/users.enum";
import { NbaseEntity } from "@src/common/types/nbase-entity";
import { Perform } from "./perform.entity";
import { Deck } from "./deck.entity";
import { ApiProperty } from "@nestjs/swagger";
import * as crypto from "crypto";

@Entity()
export class User extends NbaseEntity {
  @ApiProperty()
  @Column({
    type: "simple-enum",
    enum: UserSNSType,
    default: UserSNSType.EMAIL
  })
  snsType: UserSNSType;

  @ApiProperty()
  @Column({
    type: "simple-enum",
    enum: UserStatus,
    default: UserStatus.NORMAL
  })
  status: UserStatus;

  @ApiProperty()
  @Column({
    type: "simple-enum",
    enum: UserRole,
    default: UserRole.NORMAL
  })
  role: UserRole;

  @ApiProperty()
  @Column({
    default: ""
  })
  snsKey: string;

  @ApiProperty()
  @Column({
    default: ""
  })
  email: string;

  @ApiProperty()
  @Column({
    default: ""
  })
  pw: string;

  @ApiProperty()
  @Column({
    default: ""
  })
  imgUrl: string;

  @ApiProperty()
  @Column({
    default: "",
    nullable: false
  })
  name: string;

  @ApiProperty()
  @Column({
    default: 0
  })
  createdDecksCount: number;

  @ApiProperty()
  @Column({
    default: 0
  })
  performedMusicsCount: number;

  @ApiProperty()
  @Column({
    default: 0
  })
  performedDecksCount: number;

  @ApiProperty()
  @Column({
    default: 0
  })
  averageScore: number;

  @ApiProperty({
    type: () => Deck
  })
  @OneToMany((type) => Deck, (deck) => deck.user)
  decks?: Deck[];

  @ApiProperty({
    type: () => [Perform]
  })
  @OneToMany((type) => Perform, (perform) => perform.deck)
  performs?: Perform[];

  static getHashedPw(pw: string): string {
    const salt = "nbase-secret-salt-just1s";
    return crypto
      .createHash("sha512")
      .update(pw + salt)
      .digest("hex");
  }

  @Column({
    default: ""
  })
  refreshToken: string;

  @Column({
    type: "datetime",
    precision: 6,
    nullable: true,
    default: null
  })
  refreshTokenExpiredAt: string;
}
