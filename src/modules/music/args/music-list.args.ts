import { ApiProperty } from "@nestjs/swagger";
import { NBaseListArgs } from "@src/common/types/nbase-list-args";
import { IsNotEmpty } from "class-validator";

export class MusicListArgs extends NBaseListArgs {
  @ApiProperty({
    description: "제목을(를) 입력해주세요!",
    required: false
  })
  title: string;
  @ApiProperty({
    description: "artist을(를) 입력해주세요!",
    required: false
  })
  artist: string;
  @ApiProperty({
    description: "link을(를) 입력해주세요!",
    required: false
  })
  link: string;
}
