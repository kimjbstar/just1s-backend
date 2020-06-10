import { AuthLoginFailException } from "@src/common/http-exception";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "@src/modules/auth/auth.service";
import { User } from "@src/entities/user.entity";
import { classToPlain } from "class-transformer";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password"
    });
  }

  async validate(username: string, password: string = ""): Promise<User> {
    const user: User = await this.authService.validateUser(username, password);
    if (user === null) {
      throw new AuthLoginFailException();
    }

    return user;
  }
}
