import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { JwtAuthGuard } from "./modules/auth/jwt-auth.guard";
import { Request } from "express";
import { CurrentUser } from "./common/current-user.decorator";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { DecksService } from "@src/modules/decks/decks.service";
import { Deck } from "./entities/deck.entity";

@ApiTags("app")
@Controller()
export class AppController {
  constructor(private readonly decksService: DecksService) {}
  @Get()
  async getHello(@Req() req: Request, @CurrentUser() currentUser) {
    return "hello21";
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("i_need_token")
  async iNeedToken(@CurrentUser() currentUser) {
    return "hello21";
  }

  @Get("response_test")
  async resposneTest() {
    const a: Deck[] = await this.decksService.find({});
    const result = {
      deck: a,
      deckId: a[0].id
    };
    return result;
  }
}
