import { Controller, Get } from "@nestjs/common";
import { ModelCtor, Model } from "sequelize/types";

@Controller()
export class AppController {
  constructor() {}
  @Get()
  async getHello() {
    return "hello2";
  }
}
