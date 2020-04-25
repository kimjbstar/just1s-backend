import { Sequelize, ModelCtor, Model } from "sequelize-typescript";
import * as fs from "fs";
import * as path from "path";
import * as inflection from "inflection";
import * as child_process from "child_process";
import { ReviewsService } from "@src/modules/reviews/reviews.service";
import { UtilService } from "@src/services/util.service";
import { Review } from "@src/models/review.model";
import { Store } from "@src/models/store.model";
import { Test } from "@nestjs/testing";
import { expect, should } from "chai";

export type SequelizeModelCtor = ModelCtor<Model<any, any>>;

export interface SequelizeModelCtorMap {
  [key: string]: ModelCtor<Model<any, any>>;
}

describe("ReviewsService", () => {
  let sequelize: Sequelize;
  let reviewsService: ReviewsService;

  before(async () => {
    // set test db
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [ReviewsService, UtilService]
    }).compile();
    reviewsService = moduleRef.get<ReviewsService>(ReviewsService);
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
    const models: SequelizeModelCtor[] = [Store, Review];
    for (let modelCtor of models) {
      const fixtureJSON = await fs.readFileSync(
        path.join(fixtureDir, modelCtor.tableName)
      );
      const rows = JSON.parse(fixtureJSON.toString());
      await modelCtor.bulkCreate(rows);
    }
  });

  it("find", async () => {
    const reviews = await reviewsService.find({});
    expect(reviews.length).greaterThan(0);
  });

  it("create", async () => {
    const review = await reviewsService.create({
      title: "review_title"
    });
    expect(review["title"]).equal("review_title");
  });

  after((done) => {
    // sequelize.close();
    done();
  });
});
