import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { Module } from "@nestjs/common";
import { AppModule } from "@src/app.module";
import { ReviewsModule } from "@src/modules/reviews/reviews.module";
import { StoresModule } from "./modules/stores/stores.module";
import { MulterModule } from "@nestjs/platform-express";
import * as path from "path";
import { FilesModule } from "./modules/files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";

let sequelizeConfig: SequelizeModuleOptions;
try {
  const sequelizeRcPath = path.join(process.cwd(), ".sequelizerc");
  const sequelizeRc = require(sequelizeRcPath);
  const configPath: string = sequelizeRc["config"];

  sequelizeConfig = require(configPath)[process.env.NODE_ENV];
  sequelizeConfig.models = [path.join(__dirname, "./models")];
  sequelizeConfig.retryAttempts = 20;
  sequelizeConfig.retryDelay = 5000;
} catch (err) {
  console.log(err);
  console.log("err in load sequelize config");
  process.exit(0);
}

@Module({
  imports: [
    AppModule,
    ReviewsModule,
    UsersModule,
    AuthModule,
    StoresModule,
    FilesModule,
    SequelizeModule.forRoot(sequelizeConfig),
    MulterModule.register({
      dest: "./static"
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, "..", "static")
    })
  ],
  providers: []
})
export class RootModule {
  constructor() {}
}
