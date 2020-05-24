import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeckMusicSaveDto {
  @ApiProperty({
    description: "id(를) 입력해주세요!"
  })
  id?: number;

  @ApiProperty({
    description: "hashtag을(를) 입력해주세요!"
  })
  toDelete?: boolean;

  @IsNotEmpty()
  @ApiProperty({
    description: "link을(를) 입력해주세요!"
  })
  link?: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "artist을(를) 입력해주세요!"
  })
  artist?: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "title을(를) 입력해주세요!"
  })
  title?: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "second을(를) 입력해주세요!"
  })
  second?: number;
}
