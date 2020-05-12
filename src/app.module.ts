import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "./modules/users/users.service";
import { DecksService } from "./modules/decks/decks.service";
import { MusicsService } from "./modules/music/music.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "1q2w3e4r",
      signOptions: { expiresIn: "1d" }
    })
  ],
  controllers: [AppController],
  providers: [UsersService, DecksService, MusicsService]
})
export class AppModule {}
