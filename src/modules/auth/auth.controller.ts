import { JwtPassAuthGuard } from "@src/modules/auth/jwt-pass-auth.guard";
import { AuthService } from "@src/modules/auth/auth.service";
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  Get,
  Body,
  Query,
  UseFilters,
  HttpStatus
} from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth.guard";
import { UsersService } from "@src/modules/users/users.service";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@src/entities/user.entity";
import { SNSLoginDto } from "./dto/sns-login.dto";
import { RefreshTokenExpiredExceptionFilter } from "@src/common/exception-filters";

@ApiTags("auth")
@Controller("auth")
@UseFilters(new RefreshTokenExpiredExceptionFilter())
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
  async login(@Request() req, @Response() res) {
    // [passport-local] : validate 결과는 req.user에 담긴다
    const foundUser: User = req.user;

    const loginResult = await this.authService.login(foundUser, true);
    res.send(loginResult);
  }

  @ApiResponse({
    description: "전달된 refesh 토큰을 통해 새 access token을 얻습니다."
  })
  @UseGuards(JwtPassAuthGuard)
  @Post("refresh")
  async refresh(@Body("token") token, @Response() res) {
    const user = await this.authService.findUserFromToken(token);
    const loginResult = await this.authService.login(user, true);
    res.send(loginResult);
  }

  @ApiResponse({
    description: "전달된 토큰을 통해 현재 유저 정보를 확인합니다."
  })
  @UseGuards(JwtPassAuthGuard)
  @Get("whoami")
  withToken(@Request() req) {
    return req.currentUser ? req.currentUser : {};
  }

  @Post("sns_login")
  @ApiResponse({
    description: "sns 로그인",
    type: User
  })
  async snsLogin(@Body() dto: SNSLoginDto, @Response() res): Promise<any> {
    const user: User = await this.usersService.findOrCreateBySNSProfile(dto);
    const loginResult = await this.authService.login(user, true);
    res.send(loginResult);
  }

  @ApiResponse({
    description: "logout. 토큰 만료 처리"
  })
  @UseGuards(JwtPassAuthGuard)
  @Post("logout")
  async logout(@Request() req, @Response() res) {
    const foundUser: User = req.currentUser;
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    await this.authService.logout(foundUser);
    res.status(HttpStatus.OK).send({});
  }
}
