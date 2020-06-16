import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { DeckMusicSaveDto } from "./deck-music-save.dto";
import { DeckHashtagSaveDto } from "./deck-hashtag-save.dto";

export class DeckCreateDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "제목을(를) 입력해주세요!"
  })
  title: string;

  @ApiProperty({
    description: "repImgUrl을(를) 입력해주세요!"
  })
  repImgUrl?: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "userId을(를) 입력해주세요!"
  })
  userId: number;

  @ApiProperty({
    description: "musics을(를) 입력해주세요!"
  })
  deckMusics?: DeckMusicSaveDto[];

  @ApiProperty({
    description: "hashtags을(를) 입력해주세요!"
  })
  hashtags?: DeckHashtagSaveDto[];
}
