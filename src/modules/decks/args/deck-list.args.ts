import { ApiPropertyOptional } from "@nestjs/swagger";
import { NBaseListArgs } from "@src/common/types/nbase-list-args";
import { Type } from "class-transformer";
import { DeckListOrderBys } from "../deck.enum";

export class DeckListArgs extends NBaseListArgs {
  @ApiPropertyOptional({
    description: "제목을(를) 입력해주세요!"
  })
  title: string;

  @ApiPropertyOptional({
    description: "userId(를) 입력해주세요!"
  })
  @Type(() => Number)
  userId: number;

  @ApiPropertyOptional({
    description: "hashtag을(를) 입력해주세요!"
  })
  hashtag: string;

  @ApiPropertyOptional({
    description: "has_hashtag을(를) 입력해주세요!"
  })
  has_hashtag: boolean;

  @ApiPropertyOptional({
    description: "has_music을(를) 입력해주세요!"
  })
  has_music: boolean;

  @ApiPropertyOptional({
    description: "music_title을(를) 입력해주세요!"
  })
  music_title: string;

  @ApiPropertyOptional({
    description: "orderBy을(를) 입력해주세요 !",
    enum: Object.keys(DeckListOrderBys)
  })
  orderBy: string;
}
