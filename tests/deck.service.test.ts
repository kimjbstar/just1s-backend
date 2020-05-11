import { Test } from "@nestjs/testing";
import { expect } from "chai";
import { DecksService } from "@src/modules/decks/decks.service";
import { UsersService } from "@src/modules/users/users.service";
import { MusicsService } from "@src/modules/music/music.service";
import { Connection } from "typeorm";
import { UtilService } from "@src/services/util.service";
import { importAndGetConn } from "./common";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";

describe("deck.service.ts", () => {
  let decksService: DecksService;
  let conn: Connection;

  before(async () => {
    conn = await importAndGetConn();
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [DecksService, UsersService, MusicsService, UtilService]
    }).compile();
    decksService = moduleRef.get<DecksService>(DecksService);
  });

  it("register - Deck 등록", async () => {
    const deck = await decksService.register({
      title: "윤하 1초 맞추기",
      userId: 1,
      musics: [
        {
          link: "https://www.youtube.com/watch?v=hrO-BgLjJ-Q",
          artist: "뭔지모르겠다",
          title: "머지",
          second: 1
        },
        {
          link: "https://www.youtube.com/watch?v=r5MM2iI8-58",
          artist: "윤하",
          title: "4885",
          second: 60
        },
        {
          link: "https://www.youtube.com/watch?v=aaa",
          artist: "이건또몰까",
          title: "응",
          second: 70
        }
      ],
      hashtags: [
        {
          name: "20-30대"
        },
        {
          name: "ㅇㅇ"
        }
      ]
    });

    expect(deck["title"]).equal("윤하 1초 맞추기");
    expect(deck["deckMusics"]?.length).greaterThan(0);
    expect(deck["hashtags"]?.length).greaterThan(0);
  });

  it("perform - 문제풀기", async () => {
    const dto = {
      userId: 1,
      deckId: 15,
      answers: [
        {
          deckMusicId: 5,
          answer: "정답1"
        },
        {
          deckMusicId: 6,
          answer: "정답2"
        }
      ],
      foo: 1
    };

    const perform1 = await decksService.perform(dto);
    console.log(perform1);

    const dto2 = {
      userId: 1,
      deckId: 15,
      answers: [
        {
          deckMusicId: 5,
          answer: "리트"
        },
        {
          deckMusicId: 6,
          answer: "정답2"
        }
      ],
      foo: 1
    };

    const perform2 = await decksService.perform(dto2);
    console.log(perform2);
  });

  after(async () => {
    await conn.close();
  });
});
