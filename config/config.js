const path = require("path");
const inflection = require("inflection");

const commonConfig = {
  username: process.env.SEQUELIZE_USERNAME,
  password: process.env.SEQUELIZE_PASSWORD,
  database: process.env.SEQUELIZE_DATABASE,
  host: process.env.SEQUELIZE_HOST,
  port: process.env.SEQUELIZE_PORT,
  dialect: "mysql",
  models: [path.join(process.cwd(), "src", "models")],
  modelMatch: (_filename, _member) => {
    const filename = inflection.camelize(_filename.replace(".model", ""));
    const member = _member;
    return filename === member;
  },
  timezone: "+09:00"
};
const config = {
  local: commonConfig,
  development: commonConfig,
  production: commonConfig
};
module.exports = config;
