import { SequelizeModule } from "@nestjs/sequelize";

import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { Module } from "@nestjs/common";
import { AppModule } from "@src/app.module";
import { ReviewsModule } from "@src/modules/reviews/reviews.module";
import { StoresModule } from "./modules/stores/stores.module";
import * as path from "path";
import * as inflection from "inflection";

@Module({
  imports: [
    AppModule,
    ReviewsModule,
    UsersModule,
    AuthModule,
    StoresModule,
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: process.env.SEQUELIZE_HOST,
      port: Number(process.env.SEQUELIZE_PORT),
      username: process.env.SEQUELIZE_USERNAME,
      password: process.env.SEQUELIZE_PASSWORD,
      database: process.env.SEQUELIZE_DATABASE,
      retryAttempts: 20,
      retryDelay: 5000,
      models: [path.join(__dirname, "./models")],
      modelMatch: (_filename, _member) => {
        const filename = inflection.camelize(_filename.replace(".model", ""));
        const member = _member;
        return filename === member;
      },
      timezone: "+09:00"
    })
  ],
  providers: []
})
export class RootModule {
  constructor() {}
}
