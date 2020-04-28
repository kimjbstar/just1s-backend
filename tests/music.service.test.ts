// import { Sequelize, ModelCtor, Model } from "sequelize-typescript";
// import * as fs from "fs";
// import * as path from "path";
// import * as inflection from "inflection";
// import * as child_process from "child_process";
// import { UtilService } from "@src/services/util.service";
// import { Test } from "@nestjs/testing";
// import { expect, should } from "chai";
// import { User } from "@src/models/user.model";
// import { UsersService } from "@src/modules/users/users.service";
// import { MusicsService } from "@src/modules/music/music.service";
// import { Music } from "@src/models/music.model";

// export type SequelizeModelCtor = ModelCtor<Model<any, any>>;

// export interface SequelizeModelCtorMap {
//   [key: string]: ModelCtor<Model<any, any>>;
// }

// describe("MusicsService", () => {
//   let sequelize: Sequelize;
//   let musicsService: MusicsService;
//   let usersService: UsersService;

//   before(async () => {
//     // set test db
//     const moduleRef = await Test.createTestingModule({
//       controllers: [],
//       providers: [MusicsService, UtilService, UsersService]
//     }).compile();
//     musicsService = moduleRef.get<MusicsService>(MusicsService);
//     usersService = moduleRef.get<UsersService>(UsersService);
//     process.env.NODE_ENV = "test";
//     sequelize = new Sequelize({
//       storage: path.join(
//         process.cwd(),
//         "tests",
//         process.env.SEQUELIZE_DATABASE + "_test.db"
//       ),
//       host: "localhost",
//       dialect: "sqlite",
//       models: [path.join(process.cwd(), "src", "models")],
//       modelMatch: (_filename, _member) => {
//         const filename = inflection.camelize(_filename.replace(".model", ""));
//         const member = _member;
//         return filename === member;
//       },
//       logging: true
//     });
//     await sequelize.authenticate();
//     expect(sequelize).exist;

//     // truncate
//     await child_process.execSync(`npx sequelize db:migrate --env test`);
//   });

//   beforeEach(async () => {
//     await sequelize.truncate();
//     await sequelize.query(`UPDATE SQLITE_SEQUENCE SET seq = 0`);

//     // bulkCreate
//     const fixtureDir = path.join(process.cwd(), "/tests/fixtures");
//     const models: SequelizeModelCtor[] = [User];
//     for (let modelCtor of models) {
//       const fixtureJSON = await fs.readFileSync(
//         path.join(fixtureDir, modelCtor.tableName)
//       );
//       const rows = JSON.parse(fixtureJSON.toString());
//       await modelCtor.bulkCreate(rows);
//     }
//   });

//   it("create", async () => {
//     const music = await musicsService.create({
//       title: "먹구름",
//       artist: "윤하",
//       link: "https://www.youtube.com/watch?v=hrO-BgLjJ-Q"
//     });
//   });

//   after((done) => {
//     // sequelize.close();
//     done();
//   });
// });
