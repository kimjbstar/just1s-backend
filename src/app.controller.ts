import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { JwtAuthGuard } from "./modules/auth/jwt-auth.guard";
import { Request } from "express";
import { CurrentUser } from "./common/current-user.decorator";

@Controller()
export class AppController {
  constructor() {}
  @Get()
  async getHello(@Req() req: Request, @CurrentUser() currentUser) {
    return "hello2";
  }

  @UseGuards(JwtAuthGuard)
  @Get("i_need_token")
  async iNeedToken(@CurrentUser() currentUser) {
    return "hello2";
  }
}
