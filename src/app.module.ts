import { Module, forwardRef } from "@nestjs/common";
import { AppController } from "./app.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "./modules/users/users.service";
import { DecksService } from "./modules/decks/decks.service";
import { MusicsService } from "./modules/music/music.service";
import { RootModule } from "./root.module";
import { PassportModule } from "@nestjs/passport";
import { Connection } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "1q2w3e4r",
      signOptions: { expiresIn: "1d" }
    }),
    PassportModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [UsersService, DecksService, MusicsService],
  exports: [JwtModule]
})
export class AppModule {
  constructor(private connection: Connection) {
    console.debug("AppModule init");
    this.connection.runMigrations().then((migrations) => {
      console.debug(migrations);
    });
  }
}
