import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
import { AuthService } from "@src/modules/auth/auth.service";
import { Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Get("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("whoami")
  withToken(@Request() req) {
    return req.user;
  }
}
