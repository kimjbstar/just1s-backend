import { Expose, Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DeckPerformDto {
  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: "deckId을(를) 입력해주세요!"
  })
  deckId: number;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: "userId(를) 입력해주세요!"
  })
  userId: number;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({ type: () => DeckPerformAnswerDto })
  @Type(() => DeckPerformAnswerDto)
  answers: DeckPerformAnswerDto[];
}
export class DeckPerformAnswerDto {
  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: "deckMusicId을(를) 입력해주세요!"
  })
  deckMusicId: number;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: "answer을(를) 입력해주세요!"
  })
  answer: string;
}
