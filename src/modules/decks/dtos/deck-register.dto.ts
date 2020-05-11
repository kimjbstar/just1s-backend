import { Expose, Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DeckRegisterDto {
  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: "title을(를) 입력해주세요!"
  })
  title: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: "userId(를) 입력해주세요!"
  })
  userId: number;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({ type: () => DeckRegisterMusicDto })
  @Type(() => DeckRegisterMusicDto)
  musics: DeckRegisterMusicDto[];
}
export class DeckRegisterMusicDto {
  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: "link을(를) 입력해주세요!"
  })
  link: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: "artist을(를) 입력해주세요!"
  })
  artist: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: "title을(를) 입력해주세요!"
  })
  title: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: "second을(를) 입력해주세요!"
  })
  second: number;
}
