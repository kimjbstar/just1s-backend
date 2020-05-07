import { Test } from "@nestjs/testing";
import { expect, should } from "chai";
import * as fs from "fs";

import { DecksService } from "@src/modules/decks/decks.service";
import { UsersService } from "@src/modules/users/users.service";
import { MusicsService } from "@src/modules/music/music.service";
import { getConnectionManager } from "typeorm";
import * as path from "path";
import { UtilService } from "@src/services/util.service";
import { User } from "@src/entities/user.entity";
import { Music } from "@src/entities/music.entity";
import { Deck } from "@src/entities/deck.entity";
import { DeckMusic } from "@src/entities/deckMusic.entity";

describe("DecksService", () => {
  let decksService: DecksService;
  let usersService: UsersService;
  let musicsService: MusicsService;

  before(async () => {
    // set test db
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [DecksService, UsersService, MusicsService, UtilService]
    }).compile();
    decksService = moduleRef.get<DecksService>(DecksService);
    usersService = moduleRef.get<UsersService>(UsersService);
    musicsService = moduleRef.get<MusicsService>(MusicsService);

    const entityPath = path.join(__dirname, "../src/entities/**{.ts,.js}");
    const connectionManager = getConnectionManager();
    const beforeConnection = connectionManager.create({
      type: "sqlite",
      database: process.env.TYPEORM_DATABASE + "_test.db",
      entities: [entityPath]
    });

    const conn = await beforeConnection.connect();
    await conn.synchronize(true);

    // bulkCreate
    const fixtureDir = path.join(process.cwd(), "/tests/fixtures");
    const models = [User, Music, DeckMusic, Deck];
    for (let modelCtor of models) {
      const fixtureJSON = await fs.readFileSync(
        path.join(
          fixtureDir,
          (modelCtor as any).getRepository().metadata.tableName
        )
      );
      const rows = JSON.parse(fixtureJSON.toString());
      console.log(rows);
    }
  });

  beforeEach(async () => {});

  it("create", async () => {
    // const deck = await decksService.register({
    //   title: "윤하 1초 맞추기",
    //   userId: 1,
    //   musics: [
    //     {
    //       link: "https://www.youtube.com/watch?v=hrO-BgLjJ-Q",
    //       artist: "뭔지모르겠다",
    //       title: "머지"
    //     },
    //     {
    //       link: "https://www.youtube.com/watch?v=r5MM2iI8-58",
    //       artist: "윤하",
    //       title: "4885"
    //     }
    //   ],
    //   hashtags: [
    //     {
    //       name: "20-30대"
    //     },
    //     {
    //       name: "ㅇㅇ"
    //     }
    //   ]
    // });
    // console.log(deck);
    // expect(deck["title"]).equal("윤하 1초 맞추기");
    // expect(deck["musics"]?.length).greaterThan(0);
    // expect(deck["hashtags"]?.length).greaterThan(0);
  });

  after((done) => {
    // sequelize.close();
    done();
  });
});
