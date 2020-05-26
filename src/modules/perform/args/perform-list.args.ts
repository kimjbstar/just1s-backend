import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { NBaseListArgs } from "@src/common/types/nbase-list-args";

export class PerformListArgs extends NBaseListArgs {
  @ApiPropertyOptional({
    description: "deckId을(를) 입력해주세요!"
  })
  deckId: number;
  @ApiPropertyOptional({
    description: "userId을(를) 입력해주세요!"
  })
  userId: number;
}
