import { ApiProperty } from "@nestjs/swagger";
import { NBaseListArgs } from "@src/common/types/nbase-list-args";

export class MusicListArgs extends NBaseListArgs {
  @ApiProperty({
    description: "제목을(를) 입력해주세요!"
  })
  title: string;
  @ApiProperty({
    description: "artist을(를) 입력해주세요!"
  })
  artist: string;
  @ApiProperty({
    description: "link을(를) 입력해주세요!"
  })
  link: string;
  @ApiProperty({
    description: "averageScore을(를) 입력해주세요!"
  })
  averageScore: number;
  @ApiProperty({
    description: "belogsDecksCount을(를) 입력해주세요!"
  })
  belogsDecksCount: number;
  @ApiProperty({
    description: "performsCount을(를) 입력해주세요!"
  })
  performsCount: number;
}
