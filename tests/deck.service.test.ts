import { Test } from "@nestjs/testing";
import { expect } from "chai";
import { DecksService } from "@src/modules/decks/decks.service";
import { UsersService } from "@src/modules/users/users.service";
import { MusicsService } from "@src/modules/music/music.service";
import { Connection } from "typeorm";
import { UtilService } from "@src/services/util.service";
import { importAndGetConn } from "./common";
import { Perform } from "@src/entities/perform.entity";
import { User } from "@src/entities/user.entity";
import { DeckHashtag } from "@src/entities/deckHashtag.entity";
import { DeckMusic } from "@src/entities/deckMusic.entity";
import { DeckMusicSaveDto } from "@src/modules/decks/dtos/deck-music-save.dto";

describe("deck.service.ts", () => {
  let decksService: DecksService;
  let usersService: UsersService;
  let musicsService: MusicsService;
  let conn: Connection;

  before(async () => {
    conn = await importAndGetConn();
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [DecksService, UsersService, MusicsService, UtilService]
    }).compile();
    decksService = moduleRef.get<DecksService>(DecksService);
    usersService = moduleRef.get<UsersService>(UsersService);
    musicsService = moduleRef.get<MusicsService>(MusicsService);
  });

  // it("save hashtag", async () => {
  //   let deck;
  //   deck = await decksService.findByPk(15);
  //   console.log(deck.hashtags);

  //   // 추가 후 세이브
  //   deck.hashtags.push(
  //     new DeckHashtag({
  //       hashtag: "new1"
  //     })
  //   );
  //   deck.hashtags.push(
  //     new DeckHashtag({
  //       hashtag: "new2"
  //     })
  //   );
  //   await deck.save();
  //   deck = await decksService.findByPk(15);
  //   console.log(deck.hashtags);

  //   const newHashtags = [
  //     {
  //       id: 1,
  //       hashtag: "new1->updated1"
  //     },
  //     {
  //       hashtag: "new3"
  //     }
  //   ];
  //   deck.hashtags = newHashtags;
  //   await deck.save();
  //   deck = await decksService.findByPk(15);
  //   console.log(deck.hashtags);
  // });

  it("deck save music", async () => {
    let deck;
    deck = await decksService.findByPk(15);
    console.log(deck.deckMusics);

    let dto = [
      new DeckMusic({
        id: 50
      }),
      new DeckMusic({
        id: 6,
        toDelete: true
      }),
      new DeckMusic({
        link: "https://www.youtube.com/watch?v=ccsdcsc",
        artist: "artist",
        title: "title",
        second: 1
      })
    ];
    console.log("BEFORE");
    console.log(dto);
    // TODO :기존거 있다고 가정하고 수동으로 추가, id 파라미터 넣어서
    // 없으면 무시해야 맞지 않나

    const a = await decksService.saveDeckMusics(15, dto);
    deck = await decksService.findByPk(15);
    console.log("AFTER");
    console.log(deck.deckMusics);
  });

  // it("register - Deck 등록", async () => {
  //   const deck = await decksService.create({
  //     title: "윤하 1초 맞추기",
  //     userId: 1,
  //     musics: [
  //       {
  //         link: "https://www.youtube.com/watch?v=hrO-BgLjJ-Q",
  //         artist: "뭔지모르겠다",
  //         title: "머지",
  //         second: 1
  //       },
  //       {
  //         link: "https://www.youtube.com/watch?v=r5MM2iI8-58",
  //         artist: "윤하",
  //         title: "4885",
  //         second: 60
  //       },
  //       {
  //         link: "https://www.youtube.com/watch?v=aaa",
  //         artist: "이건또몰까",
  //         title: "응",
  //         second: 70
  //       }
  //     ],
  //     hashtags: [
  //       {
  //         hashtag: "20-30대"
  //       },
  //       {
  //         hashtag: "ㅇㅇ"
  //       }
  //     ]
  //   });

  //   expect(deck["title"]).equal("윤하 1초 맞추기");
  //   expect(deck["deckMusics"]?.length).greaterThan(0);
  //   expect(deck["hashtags"]?.length).greaterThan(0);
  // });

  // it("perform - 문제풀기", async () => {
  //   const dto = {
  //     userId: 1,
  //     deckId: 15,
  //     answers: [
  //       {
  //         deckMusicId: 5,
  //         answer: "노래제3"
  //       },
  //       {
  //         deckMusicId: 6,
  //         answer: "오답"
  //       }
  //     ]
  //   };

  //   // before
  //   let user: User = await usersService.findByPk(dto.userId);
  //   expect(user.performedDecksCount).equal(0);
  //   expect(user.performedMusicsCount).equal(0);

  //   const perform1: Perform = await decksService.perform(dto);
  //   expect(perform1.answers[0].isCorrect).true;
  //   expect(perform1.answers[1].isCorrect).false;

  //   const dto2 = {
  //     userId: 1,
  //     deckId: 15,
  //     answers: [
  //       {
  //         deckMusicId: 5,
  //         answer: "리트"
  //       },
  //       {
  //         deckMusicId: 6,
  //         answer: "오답2"
  //       }
  //     ]
  //   };

  //   // 이미 수행됬을 경우 기록에 영향을 안줌
  //   const perform2 = await decksService.perform(dto2);
  //   expect(perform2.answers[0].isCorrect).true;
  //   expect(perform2.answers[1].isCorrect).false;

  //   user = await usersService.findByPk(dto.userId);

  //   expect(user.performedDecksCount).not.equal(0);
  //   expect(user.performedMusicsCount).not.equal(0);

  //   await musicsService.recheckAllAnswers(2);
  // });

  after(async () => {
    await conn.close();
  });
});
