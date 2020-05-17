import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
import { AuthService } from "@src/modules/auth/auth.service";
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body
} from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    description: "email, password를 통해 인증 후, access_token을 발급힙니다."
  })
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiResponse({
    description: "전달된 토큰을 통해 현재 유저 정보를 확인합니다."
  })
  @UseGuards(JwtAuthGuard)
  @Get("whoami")
  withToken(@Request() req) {
    return req.user;
  }
}
