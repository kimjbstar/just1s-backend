import { Test } from "@nestjs/testing";
import { expect } from "chai";
import { DecksService } from "@src/modules/decks/decks.service";
import { UsersService } from "@src/modules/users/users.service";
import { MusicsService } from "@src/modules/music/music.service";
import { Connection } from "typeorm";
import { UtilService } from "@src/services/util.service";
import { importAndGetConn } from "./common";

describe("music.service.ts", () => {
  let musicsService: MusicsService;
  let conn: Connection;

  before(async () => {
    conn = await importAndGetConn();
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [DecksService, UsersService, MusicsService, UtilService]
    }).compile();
    musicsService = moduleRef.get<MusicsService>(MusicsService);
  });

  beforeEach(async () => {});

  it("create - Music 추가", async () => {
    const music = await musicsService.create({
      title: "먹구름",
      artist: "윤하",
      link: "https://www.youtube.com/watch?v=hrO-BgLjJ-Q"
    });
    // console.log(music);
  });

  after(async () => {
    await conn.close();
  });
});
