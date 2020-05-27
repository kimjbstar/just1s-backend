import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DeckPerformDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "deckId을(를) 입력해주세요!"
  })
  deckId: number;

  @ApiProperty({
    description: "userId(를) 입력해주세요!"
  })
  @IsOptional()
  userId?: number;

  @IsNotEmpty()
  @ApiProperty({ type: () => DeckPerformAnswerDto })
  @Type(() => DeckPerformAnswerDto)
  answers: DeckPerformAnswerDto[];
}
export class DeckPerformAnswerDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "deckMusicId을(를) 입력해주세요!"
  })
  deckMusicId: number;

  @IsNotEmpty()
  @ApiProperty({
    description: "answer을(를) 입력해주세요!"
  })
  answer: string;
}
