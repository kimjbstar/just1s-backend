import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
import { AuthService } from "@src/modules/auth/auth.service";
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Query
} from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth.guard";
import { UsersService } from "@src/modules/users/users.service";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@src/entities/user.entity";
import { SNSLoginDto } from "./dto/sns-login.dto";
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @ApiResponse({
    description: "email, password를 통해 인증 후, access_token을 발급힙니다."
  })
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    const foundUser: User = req.user;
    return this.authService.login(foundUser, true);
  }

  @ApiResponse({
    description: "전달된 refesh 토큰을 통해 새 access token을 얻습니다."
  })
  @UseGuards(JwtAuthGuard)
  @Post("refresh")
  async refresh(@Body("token") token) {
    const user = await this.authService.findUserFromToken(token);
    return this.authService.login(user);
  }

  @ApiResponse({
    description: "전달된 토큰을 통해 현재 유저 정보를 확인합니다."
  })
  @UseGuards(JwtAuthGuard)
  @Get("whoami")
  withToken(@Request() req) {
    return req.currentUser ? req.currentUser : {};
  }

  @Post("sns_login")
  @ApiResponse({
    description: "sns 로그인",
    type: User
  })
  async snsLogin(@Body() dto: SNSLoginDto): Promise<any> {
    const user: User = await this.usersService.findOrCreateBySNSProfile(dto);
    return this.authService.login(user);
  }

  @ApiResponse({
    description: "logout. 토큰 만료 처리"
  })
  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Request() req) {
    const foundUser: User = req.user;
    return this.authService.logout(foundUser);
  }
}
