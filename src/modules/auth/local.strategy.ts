import { User } from "@src/models/user.model";
import { AuthLoginFailException } from "@src/common/http-exception";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "@src/modules/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password"
    });
  }

  async validate(username: string, password: string): Promise<object> {
    const user: User = await this.authService.validateUser(username, password);
    if (user === null) {
      throw new AuthLoginFailException();
    }

    user.pw = "";
    return user.get({ plain: true });
  }
}
