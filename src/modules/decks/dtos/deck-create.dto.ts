import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeckCreateDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "제목을(를) 입력해주세요!"
  })
  title: string;
  @ApiProperty({
    description: "hitsCount을(를) 입력해주세요!"
  })
  hitsCount: number;
  @ApiProperty({
    description: "averageScore을(를) 입력해주세요!"
  })
  averageScore: number;
}
