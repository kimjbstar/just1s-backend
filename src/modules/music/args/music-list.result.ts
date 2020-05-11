import { NbaseListResult } from "@src/common/types/nbase-list-result";
import { Type } from "class-transformer";
import { Music } from "@src/entities/music.entity";

export class MusicListResult extends NbaseListResult {
  @Type(() => Music)
  musics: Music[];
}
