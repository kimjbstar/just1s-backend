import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { NBaseListArgs } from "@src/common/types/nbase-list-args";
import { Type } from "class-transformer";

export class DeckListArgs extends NBaseListArgs {
  @ApiProperty({
    description: "제목을(를) 입력해주세요!",
    required: false
  })
  title: string;

  @ApiProperty({
    description: "제목을(를) 입력해주세요!",
    required: false
  })
  @Type(() => Number)
  userId: number;

  @ApiProperty({
    description: "제목을(를) 입력해주세요!",
    required: false
  })
  hashtag: string;
}
