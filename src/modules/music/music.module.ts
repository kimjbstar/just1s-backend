import { Module } from "@nestjs/common";
import { MusicController } from "./music.controller";
import { MusicsService } from "@src/modules/music/music.service";
import { UtilService } from "@src/services/util.service";

@Module({
  imports: [],
  controllers: [MusicController],
  providers: [UtilService, MusicsService]
})
export class MusicModule {}
