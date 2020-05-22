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
    return this.authService.login(req.user);
  }

  @ApiResponse({
    description: "전달된 토큰을 통해 현재 유저 정보를 확인합니다."
  })
  @UseGuards(JwtAuthGuard)
  @Get("whoami")
  withToken(@Request() req) {
    return req.currentUser ? req.currentUser : {};
  }

  // @UseGuards(AuthGuard("facebook"))
  // async facebook(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  // @Get()
  // @ApiResponse({
  //   description: "Deck의 리스트를 가져옵니다.",
  //   type: DeckListResult
  // })
  // async find(@Query() args: DeckListArgs): Promise<any> {
  //   return await Deck.createList(DeckListResult, createDeckListConfig, args);
  // }

  @Post("sns_login")
  @ApiResponse({
    description: "sns 로그인",
    type: User
  })
  async snsLogin(@Body() dto: SNSLoginDto): Promise<any> {
    const user: User = await this.usersService.findOrCreateBySNSProfile(dto);
    return this.authService.login(user);
  }
}
