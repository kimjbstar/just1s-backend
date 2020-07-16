const config = {
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  entities: ["dist/src/entities/**/*.js"],
  migrations: ["dist/src/migration/*.js"],
  subscribers: ["dist/src/subscribers/*.js"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration"
  },
  synchronize: false,
  logging: true
};
if (process.env.NODE_ENV === "local") {
  config.entities = ["dist/src/entities/**/*.js", "src/entities/**/*.ts"];
}

module.exports = config;
