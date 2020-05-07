import {
  getConnectionManager,
  getConnection,
  Connection,
  createConnection,
  Column,
  Entity
} from "typeorm";
import "reflect-metadata";
import { Deck } from "./entities/deck.entity";
import { DeckMusic } from "./entities/deckMusic.entity";
import { Music } from "./entities/music.entity";
import * as path from "path";
import { DeckHashtag } from "./entities/deckHashtag.entity";
import { User } from "@src/entities/user.entity";
// import { User } from "./entities/user.entity";
import { Perform } from "./entities/perform.entity";
import { Answer } from "./entities/answer.entity";
import { NbaseEntity } from "./common/types/nbase-entity";
import { MusicsService } from "./modules/music/music.service";
import { UtilService } from "./services/util.service";

@Entity()
export class TestEntity extends NbaseEntity {
  @Column()
  title!: string;
}

const bootstrap = async () => {
  const entityPath = path.join(__dirname, "entities/**{.ts,.js}");

  console.log(entityPath);
  const connectionManager = getConnectionManager();
  const beforeConnection = connectionManager.create({
    type: "mysql",
    host: process.env.TYPEORM_HOST,
    port: 3306,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [entityPath]
  });

  const conn = await beforeConnection.connect();

  const dto = {
    title: "윤하 1초 맞추기",
    userId: 1,
    musics: [
      {
        link: "https://www.youtube.com/watch?v=hrO-BgLjJ-Q",
        artist: "뭔지모르겠다",
        title: "머지"
      },
      {
        link: "https://www.youtube.com/watch?v=r5MM2iI8-58",
        artist: "윤하",
        title: "4885"
      }
    ],
    hashtags: [
      {
        hashtag: "20-30대"
      },
      {
        hashtag: "ㅇㅇ"
      }
    ]
  };

  const utilService = new UtilService();
  const musicService = new MusicsService(utilService);

  const user = new User({
    snsType: "EMAIL",
    email: "kimjbstar@gmail.com",
    name: "test"
  });

  await user.save();
  await user.reload();

  dto.userId = user.id;
  // const key = musicService.getKey(deckHashtag.name);
  // console.log(key);

  const deckMusics: DeckMusic[] = [];
  const deckHashtags: DeckHashtag[] = [];
  for (const _hashtag of dto.hashtags) {
    const deckHashtag: DeckHashtag = new DeckHashtag(_hashtag);
    // deckHashtag.save()
    await deckHashtag.save();
    await deckHashtag.reload();
    deckHashtags.push(deckHashtag);
  }
  const input = {
    title: dto.title,
    user: new User({
      id: dto.userId
    }),
    deckMusics: deckMusics,
    deckHashtags: deckHashtags
  };
  const deck = new Deck(input);
  const savedDeck = await deck.save();

  console.log(savedDeck);

  // 트랜잭션으로 테스트 ㄲㄱ
  // manytoone, subtable까지는 자동화 가능할듯

  //   console.log(deck);
  //   await deck.save();
  //   const allDecks = await Deck.find();
  //   console.log(allDecks);

  //   deck.
  //   user.firstName = "Timber";
  //   user.lastName = "Saw";
  //   user.age = 25;
  //   await user.save();

  //   const allUsers = await User.find();
  //   const firstUser = await User.findOne(1);
  //   const timber = await User.findOne({ firstName: "Timber", lastName: "Saw" });

  //   await timber.remove();
};
bootstrap();

// @Mutation(returns => User)
// async testJoin(
//   @Args('userCreateDto') userCreateDto: UserCreateDto,
//   @Info() info,
// ): Promise<User> {
//   const input = {
//     app: new App({
//       id: userCreateDto.appId,
//     }),
//     stringId: userCreateDto.stringId,
//     name: userCreateDto.name,
//     pw: this.usersService.hashPw(userCreateDto.pw),
//     phoneNumber: userCreateDto.phoneNumber,
//     addresses: [
//       new UserAddress({
//         title: userCreateDto.address.title,
//         name: userCreateDto.address.name || userCreateDto.name,
//         address1: userCreateDto.address.address1,
//         address2: userCreateDto.address.address2,
//         zipcode: userCreateDto.address.zipcode,
//         phoneNumber:
//           userCreateDto.address.phoneNumber || userCreateDto.phoneNumber,
//       }),
//     ],
//   };
//   const user: User = new User(input);

//   return user.save();
// }
