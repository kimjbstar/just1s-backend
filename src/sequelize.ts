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
    return (
      filename.substring(0, filename.indexOf(".model")) === member.toLowerCase()
    );
  },
  timezone: "+09:00"
});
// return filename === member.toLowerCase();
console.log("sUCCESS");
