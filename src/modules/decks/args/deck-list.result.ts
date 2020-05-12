import { NbaseListResult } from "@src/common/types/nbase-list-result";
import { Type } from "class-transformer";
import { Deck } from "@src/entities/deck.entity";
import { ApiProperty } from "@nestjs/swagger";

export class DeckListResult extends NbaseListResult {
  @ApiProperty({
    type: Deck
  })
  @Type(() => Deck)
  decks: Deck[];
}
