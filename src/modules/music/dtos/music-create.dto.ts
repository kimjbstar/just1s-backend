import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class MusicCreateDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "제목을(를) 입력해주세요!"
  })
  title: string;
  @ApiProperty({
    description: "artist을(를) 입력해주세요!"
  })
  artist: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "link을(를) 입력해주세요!"
  })
  link: string;
}
