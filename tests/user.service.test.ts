import { Test } from "@nestjs/testing";
import { expect } from "chai";
import { DecksService } from "@src/modules/decks/decks.service";
import { UsersService } from "@src/modules/users/users.service";
import { Connection } from "typeorm";
import { UtilService } from "@src/services/util.service";
import { importAndGetConn } from "./common";
import { MusicsService } from "@src/modules/music/music.service";

describe("user.service.ts", () => {
  let usersService: UsersService;
  let conn: Connection;

  before(async () => {
    conn = await importAndGetConn();
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        DecksService,
        UsersService,
        UsersService,
        UtilService,
        MusicsService
      ]
    }).compile();
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  beforeEach(async () => {});

  it("create - User 추가", async () => {
    const user = await usersService.create({
      snsType: "FACEBOOK",
      name: "아으"
    });
  });

  after(async () => {
    await conn.close();
  });
});
