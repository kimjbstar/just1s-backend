import { NbaseListResult } from "@src/common/types/nbase-list-result";
import { Type } from "class-transformer";
import { Deck } from "@src/entities/deck.entity";

export class DeckListResult extends NbaseListResult {
  @Type(() => Deck)
  decks: Deck[];
}
