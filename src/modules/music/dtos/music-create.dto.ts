import { ApiProperty } from "@nestjs/swagger";

export class MusicCreateDto {
  @ApiProperty({
    description: "제목을(를) 입력해주세요!"
  })
  title: string;
  @ApiProperty({
    description: "artist을(를) 입력해주세요!"
  })
  artist: string;
  @ApiProperty({
    description: "link을(를) 입력해주세요!"
  })
  link: string;
}
