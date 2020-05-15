import { ApiProperty } from "@nestjs/swagger";
import { DeckRegisterMusicDto } from "./deck-register.dto";

export class DeckMusicSaveDto extends DeckRegisterMusicDto {
  @ApiProperty({
    description: "id(를) 입력해주세요!"
  })
  id?: number;

  @ApiProperty({
    description: "hashtag을(를) 입력해주세요!"
  })
  toDelete: boolean;
}
