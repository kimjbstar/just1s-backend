import { SequelizeTypescriptMigration } from "sequelize-typescript-migration";
import { Sequelize } from "sequelize-typescript";
import * as path from "path";
import * as inflection from "inflection";

const bootstrap = async () => {
  const sequelize: Sequelize = new Sequelize({
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DATABASE,
    host: process.env.SEQUELIZE_HOST,
    port: Number(process.env.SEQUELIZE_PORT),
    dialect: "mysql",
    models: [path.join(process.cwd(), "src", "models")],
    modelMatch: (_filename, _member) => {
      const filename = inflection.camelize(_filename.replace(".model", ""));
      const member = _member;
      return filename === member;
    },
    timezone: "+09:00",
    // logging: false,
  });
  await sequelize.authenticate();
  const makeMigrationResult = await SequelizeTypescriptMigration.makeMigration(
    sequelize,
    {
      outDir: path.join(__dirname, "../migrations"),
      preview: true,
      migrationName: "foo bar",
    }
  );
  console.log(makeMigrationResult);
};
bootstrap();
