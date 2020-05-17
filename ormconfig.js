const config = {
  type: "mysql",
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ["dist/src/entities/**/*.js", "src/entities/**/*.ts"],
  migrations: ["dist/src/migration/*.js"],
  subscribers: ["dist/src/subscribers/*.js"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration"
  },
  synchronize: false,
  logging: true
};

module.exports = config;
