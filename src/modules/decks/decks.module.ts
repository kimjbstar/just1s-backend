import { Module } from "@nestjs/common";
import { DecksController } from "./decks.controller";
import { DecksService } from "@src/modules/decks/decks.service";
import { UtilService } from "@src/services/util.service";
import { MusicsService } from "../music/music.service";
import { UsersService } from "../users/users.service";

@Module({
  imports: [],
  controllers: [DecksController],
  providers: [UtilService, DecksService, MusicsService, UsersService]
})
export class DecksModule {}
