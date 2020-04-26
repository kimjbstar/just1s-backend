import { Module } from "@nestjs/common";
import { MusicController } from "./music.controller";
import { MusicService } from "@src/modules/music/music.service";
import { UtilService } from "@src/services/util.service";

@Module({
  imports: [],
  controllers: [MusicController],
  providers: [UtilService, MusicService]
})
export class MusicModule {}
