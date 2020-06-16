import { NbaseListResult } from "@src/common/types/nbase-list-result";
import { Type } from "class-transformer";
import { Music } from "@src/entities/music.entity";
import { ApiProperty } from "@nestjs/swagger";

export class MusicListResult extends NbaseListResult {
  @ApiProperty({
    type: [Music]
  })
  @Type(() => Music)
  musics: Music[];
}
