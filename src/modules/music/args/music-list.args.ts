import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { NBaseListArgs } from "@src/common/types/nbase-list-args";

export class MusicListArgs extends NBaseListArgs {
  @ApiPropertyOptional({
    description: "제목을(를) 입력해주세요!"
  })
  title: string;
  @ApiPropertyOptional({
    description: "artist을(를) 입력해주세요!"
  })
  artist: string;
  @ApiPropertyOptional({
    description: "link을(를) 입력해주세요!"
  })
  link: string;
}
