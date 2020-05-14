import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DeckHashtagSaveDto {
  @ApiProperty({
    description: "id(를) 입력해주세요!"
  })
  id?: number;

  @IsNotEmpty()
  @ApiProperty({
    description: "hashtag을(를) 입력해주세요!"
  })
  hashtag: number;

  @ApiProperty({
    description: "hashtag을(를) 입력해주세요!"
  })
  toDelete: boolean;
}
