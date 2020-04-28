import { Sequelize, ModelCtor, Model } from "sequelize-typescript";
import * as fs from "fs";
import * as path from "path";
import * as inflection from "inflection";
import * as child_process from "child_process";
import { DecksService } from "@src/modules/decks/decks.service";
import { UtilService } from "@src/services/util.service";
import { Test } from "@nestjs/testing";
import { expect, should } from "chai";
import { User } from "@src/models/user.model";
import { UsersService } from "@src/modules/users/users.service";
import { Deck } from "@src/models/deck.model";
import { MusicsService } from "@src/modules/music/music.service";
import { Music } from "@src/models/music.model";

export type SequelizeModelCtor = ModelCtor<Model<any, any>>;

export interface SequelizeModelCtorMap {
  [key: string]: ModelCtor<Model<any, any>>;
}

describe("DecksService", () => {
  let sequelize: Sequelize;
  let decksService: DecksService;
  let usersService: UsersService;
  let musicsService: MusicsService;

  before(async () => {
    // set test db
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [DecksService, UtilService, UsersService, MusicsService]
    }).compile();
    decksService = moduleRef.get<DecksService>(DecksService);
    usersService = moduleRef.get<UsersService>(UsersService);
    musicsService = moduleRef.get<MusicsService>(MusicsService);
    process.env.NODE_ENV = "test";
    sequelize = new Sequelize({
      storage: path.join(
        process.cwd(),
        "tests",
        process.env.SEQUELIZE_DATABASE + "_test.db"
      ),
      host: "localhost",
      dialect: "sqlite",
      models: [path.join(process.cwd(), "src", "models")],
      modelMatch: (_filename, _member) => {
        const filename = inflection.camelize(_filename.replace(".model", ""));
        const member = _member;
        return filename === member;
      },
      logging: false
    });
    await sequelize.authenticate();
    expect(sequelize).exist;

    // truncate
    await child_process.execSync(`npx sequelize db:migrate --env test`);
    await sequelize.truncate();
    await sequelize.query(`UPDATE SQLITE_SEQUENCE SET seq = 0`);

    // bulkCreate
    const fixtureDir = path.join(process.cwd(), "/tests/fixtures");
    const models: SequelizeModelCtor[] = [User, Music];
    for (let modelCtor of models) {
      const fixtureJSON = await fs.readFileSync(
        path.join(fixtureDir, modelCtor.tableName)
      );
      const rows = JSON.parse(fixtureJSON.toString());
      await modelCtor.bulkCreate(rows);
    }
  });

  beforeEach(async () => {});

  it("create", async () => {
    const deck = await decksService.register({
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
          name: "20-30대"
        },
        {
          name: "ㅇㅇ"
        }
      ]
    });
    console.log(deck);
    expect(deck["title"]).equal("윤하 1초 맞추기");
    expect(deck["musics"]?.length).greaterThan(0);
    expect(deck["hashtags"]?.length).greaterThan(0);
  });

  after((done) => {
    // sequelize.close();
    done();
  });
});
