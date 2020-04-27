import { Module } from "@nestjs/common";
import { DecksController } from "./decks.controller";
import { DecksService } from "@src/modules/decks/decks.service";
import { UtilService } from "@src/services/util.service";

@Module({
  imports: [],
  controllers: [DecksController],
  providers: [UtilService, DecksService]
})
export class DecksModule {}