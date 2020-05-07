import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { Module } from "@nestjs/common";
import { AppModule } from "@src/app.module";
import { MulterModule } from "@nestjs/platform-express";
import * as path from "path";
import { FilesModule } from "./modules/files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { DecksModule } from "./modules/decks/decks.module";
import { MusicModule } from "./modules/music/music.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";

// let sequelizeConfig: SequelizeModuleOptions;
// try {
//   const sequelizeRcPath = path.join(process.cwd(), ".sequelizerc");
//   const sequelizeRc = require(sequelizeRcPath);
//   const configPath: string = sequelizeRc["config"]; //

//   sequelizeConfig = require(configPath)[process.env.NODE_ENV];
//   sequelizeConfig.models = [path.join(__dirname, "./models")];
//   sequelizeConfig.retryAttempts = 20;
//   sequelizeConfig.retryDelay = 5000;
//   sequelizeConfig.logging = true;
//   // console.log(path.join(__dirname, "..", "static"));
// } catch (err) {
//   console.log(err);
//   console.log("err in load sequelize config");
//   process.exit(0);
// }

@Module({
  imports: [
    AppModule,
    UsersModule,
    AuthModule,
    FilesModule,
    DecksModule,
    MusicModule,
    // SequelizeModule.forRoot(sequelizeConfig),
    TypeOrmModule.forRoot(),
    MulterModule.register({
      dest: "./static"
    })
  ],
  providers: []
})
export class RootModule {
  constructor(private connection: Connection) {
    this.connection.runMigrations().then((migrations) => {
      console.log(migrations);
    });
  }
}
