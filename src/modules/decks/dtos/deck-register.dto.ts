import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class DeckRegisterDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "title을(를) 입력해주세요!"
  })
  title: string;

  @ApiProperty({
    description: "repImgUrl을(를) 입력해주세요!"
  })
  repImgUrl: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "userId(를) 입력해주세요!"
  })
  userId: number;

  @IsNotEmpty()
  @ApiProperty({ type: () => DeckRegisterMusicDto })
  @Type(() => DeckRegisterMusicDto)
  musics: DeckRegisterMusicDto[];
}
export class DeckRegisterMusicDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "link을(를) 입력해주세요!"
  })
  link: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "artist을(를) 입력해주세요!"
  })
  artist: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "title을(를) 입력해주세요!"
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "second을(를) 입력해주세요!"
  })
  second: number;
}
