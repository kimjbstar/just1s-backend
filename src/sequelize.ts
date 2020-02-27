import { Sequelize } from "sequelize-typescript";

console.log(__dirname + "/models");

export const sequelize = new Sequelize({
  database: "nbase",
  username: "kimjbstar",
  password: "12091457",
  dialect: "mysql",
  host: "localhost",
  models: [__dirname + "/models"],
  modelMatch: (filename, member) => {
    return filename === member.toLowerCase();
  },
  timezone: "+09:00"
  // logging: console.log
});

console.log("sUCCESS");
