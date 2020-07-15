import {
  Controller,
  Get,
  UseGuards,
  Req,
  Response,
  Request,
  Query
} from "@nestjs/common";
import { CurrentUser } from "./common/current-user.decorator";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("app")
@Controller()
export class AppController {
  constructor() {}
  @Get()
  async getHello(@Req() req: Request, @CurrentUser() currentUser) {
    return {
      app: "just1s",
      author: ["kimjbstar@gmail.com", "stnh2622@gmail.com"],
      url: "https://api.just1s.xyz",
      desc: "단1초 API 서버입니다.!!",
      test: "modefied"
    };
  }
}
