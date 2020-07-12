import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "./modules/users/users.service";
import { DecksService } from "./modules/decks/decks.service";
import { MusicsService } from "./modules/music/music.service";
import { PassportModule } from "@nestjs/passport";
import { Connection } from "typeorm";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

const entityContexts = (require as any).context(
  "./entities",
  true,
  /\.entity.ts$/
);
const entities = entityContexts
  .keys()
  .map((modulePath) => entityContexts(modulePath))
  .reduce(
    (result, entityModule) =>
      result.concat(Object.keys(entityModule).map((key) => entityModule[key])),
    []
  );
console.log(entities);

const migrationContexts = (require as any).context(
  "./migration",
  true,
  /\.ts$/
);
const migrations = migrationContexts
  .keys()
  .map((modulePath) => migrationContexts(modulePath))
  .reduce(
    (result, migrationModule) =>
      result.concat(
        Object.keys(migrationModule).map((key) => migrationModule[key])
      ),
    []
  );
console.log(migrations);

const subscriberContexts = (require as any).context(
  "./subscribers",
  true,
  /\.subscriber.ts$/
);
const subscribers = subscriberContexts
  .keys()
  .map((modulePath) => subscriberContexts(modulePath))
  .reduce(
    (result, subscriberModule) =>
      result.concat(
        Object.keys(subscriberModule).map((key) => subscriberModule[key])
      ),
    []
  );

const env = Object.assign({}, process.env);

const typeORMConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: env.TYPEORM_HOST,
  port: Number(env.TYPEORM_PORT),
  username: env.TYPEORM_USERNAME,
  password: env.TYPEORM_PASSWORD,
  database: env.TYPEORM_DATABASE,
  entities: entities,
  migrations: migrations,
  subscribers: subscribers,
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration"
  },
  synchronize: false,
  logging: true
};

console.log(typeORMConfig);

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "1q2w3e4r",
      signOptions: { expiresIn: "30m" }
    }),
    PassportModule,
    TypeOrmModule.forRoot(typeORMConfig)
  ],
  controllers: [AppController],
  providers: [UsersService, DecksService, MusicsService],
  exports: [JwtModule]
})
export class AppModule {
  constructor(private connection: Connection) {
    this.connection.showMigrations().then((a) => {
      console.log("pending migration exists??", a);
    });
    this.connection.runMigrations().then((migrations) => {
      console.debug(migrations);
    });
  }
}
