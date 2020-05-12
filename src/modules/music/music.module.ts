import { Module } from "@nestjs/common";
import { MusicController } from "./music.controller";
import { MusicsService } from "@src/modules/music/music.service";

@Module({
  imports: [],
  controllers: [MusicController],
  providers: [MusicsService]
})
export class MusicModule {}
