import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { NBaseListArgs } from "@src/common/types/nbase-list-args";
import { Type } from "class-transformer";

export class DeckListArgs extends NBaseListArgs {
  @ApiProperty({
    description: "제목을(를) 입력해주세요!"
  })
  title: string;

  @ApiProperty({
    description: "제목을(를) 입력해주세요!"
  })
  @Type(() => Number)
  userId: number;

  @ApiProperty({
    description: "제목을(를) 입력해주세요!"
  })
  hashtag: string;
}
