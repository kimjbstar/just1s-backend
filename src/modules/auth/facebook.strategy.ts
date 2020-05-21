import { AuthLoginFailException } from "@src/common/http-exception";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      clientID: 587072722189448,
      clientSecret: "63d66118a3fc31f49e0b662688fd8ba9",
      fbGraphVersion: "v3.0"
    });
  }
  // client token efdc8a96cf236d0062a36fcd534edeaa

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ) {
    const user = await this.userService.findOrCreateByFacebook(profile);
    return user;
  }
}
