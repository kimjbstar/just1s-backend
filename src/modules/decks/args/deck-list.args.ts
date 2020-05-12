import { IsNotEmpty } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { NBaseListArgs } from "@src/common/types/nbase-list-args";
import { Type } from "class-transformer";

export class DeckListArgs extends NBaseListArgs {
  @ApiPropertyOptional({
    description: "제목을(를) 입력해주세요!"
  })
  title: string;

  @ApiPropertyOptional({
    description: "제목을(를) 입력해주세요!"
  })
  @Type(() => Number)
  userId: number;

  @ApiPropertyOptional({
    description: "제목을(를) 입력해주세요!"
  })
  hashtag: string;
}
