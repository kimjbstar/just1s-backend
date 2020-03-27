import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from "@nestjs/common";
import { AppModule } from "@src/app.module";
import { ReviewsModule } from "@src/modules/reviews/reviews.module";
import * as path from "path";
import * as inflection from "inflection";
import { StoresModule } from "./modules/stores/stores.module";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: process.env.SEQUELIZE_HOST || "localhost",
      port: Number(process.env.SEQUELIZE_PORT) || 3306,
      username: process.env.SEQUELIZE_USERNAME || "kimjbstar",
      password: process.env.SEQUELIZE_PASSWORD || "12091457",
      database: process.env.SEQUELIZE_DATABASE || "nbase",
      retryAttempts: 20,
      retryDelay: 5000,
      models: [path.join(__dirname, "./models")],
      modelMatch: (_filename, _member) => {
        const filename = inflection.camelize(_filename.replace(".model", ""));
        const member = _member;
        return filename === member;
      },
      timezone: "+09:00"
    }),
    AppModule,
    ReviewsModule,
    UsersModule,
    AuthModule,
    StoresModule
  ]
})
export class RootModule {
  constructor() {}
}
