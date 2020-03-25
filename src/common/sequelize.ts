import logger from "@src/library/winston";
import { Sequelize } from "sequelize-typescript";
import * as path from "path";
import * as inflection from "inflection";

export const setConnection = async () => {
  const modelPath = path.join(__dirname, "../models");

  let sequelize: Sequelize;
  while (true) {
    logger.info("try connect to sequelize");
    try {
      sequelize = new Sequelize({
        database: process.env.SEQUELIZE_DATABASE,
        username: process.env.SEQUELIZE_USERNAME,
        password: process.env.SEQUELIZE_PASSWORD,
        host: process.env.SEQUELIZE_HOST,
        port: Number(process.env.SEQUELIZE_PORT),
        dialect: "mysql",
        models: [modelPath],
        modelMatch: (_filename, _member) => {
          const filename = inflection.camelize(_filename.replace(".model", ""));
          const member = _member;
          return filename === member;
        },
        timezone: "+09:00"
      });
      await sequelize.authenticate();
      // await sequelize.sync({ alter: true });
      return sequelize;
    } catch (e) {
      console.log(e);
      console.log("sleep 10 sec ...");
      await new Promise(r => setTimeout(r, 10000));
    }
  }
};
