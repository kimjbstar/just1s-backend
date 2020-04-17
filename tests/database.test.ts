import { Sequelize } from "sequelize-typescript";
import * as path from "path";
import * as inflection from "inflection";
import * as child_process from "child_process";
import { ReviewsService } from "@src/modules/reviews/reviews.service";
import { UtilService } from "@src/services/util.service";
import { SequelizeModuleOptions } from "@nestjs/sequelize";

describe("Review Service", () => {
  let sequelize: Sequelize;
  let reviewsService: ReviewsService;
  let utilService: UtilService;

  beforeAll(async () => {
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
    expect(sequelize).toBeDefined();
    await child_process.execSync(`npx sequelize db:migrate --env test`);
    await sequelize.truncate();
    await sequelize.query(`UPDATE SQLITE_SEQUENCE SET seq = 0`);
    reviewsService = new ReviewsService(utilService);
  });

  afterAll(() => {});

  test("review", async () => {
    const a = await reviewsService.create({
      title: "review_title"
    });
    console.log(a);
  });
});
