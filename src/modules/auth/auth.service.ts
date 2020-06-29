import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@src/entities/user.entity";
import { UsersService } from "../users/users.service";
import {
  NotLogginedException,
  CustomException,
  RefreshTokenExpiredException
} from "@src/common/http-exception";
import * as moment from "moment";
import * as crypto from "crypto";
import { MoreThan } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}
  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await User.findOne({
      where: {
        email: email
      }
    });
    console.log(user);
    if (user === undefined || user === null) {
      return null;
    }
    // TODO : snsType, role 등 추가 체크
    if (user.pw !== User.getHashedPw(password)) {
      return null;
    }
    return user;
  }

  async findUserFromToken(token): Promise<User> {
    const users: User[] = await User.find({
      refreshToken: token,
      refreshTokenExpiredAt: MoreThan(
        moment().format("YYYY-MM-DD HH:mm:ss.SSSSSS")
      )
    });
    console.log(users);
    if (users.length == 0) {
      throw new RefreshTokenExpiredException();
    }
    return users[0];
  }

  async login(user: User, issueNewRefreshToken = false) {
    const payload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    if (issueNewRefreshToken === true) {
      const refreshToken = crypto
        .createHash("md5")
        .update(user.id + "-" + Date.now())
        .digest("hex");
      const refreshTokenExpiredAt = moment()
        .add(1, "d")
        .format("YYYY-MM-DD HH:mm:ss.SSSSSS");
      user.refreshToken = refreshToken;
      user.refreshTokenExpiredAt = refreshTokenExpiredAt;
      console.log(user);
      await user.save();
      user.reload();
    }

    return {
      accessToken: accessToken,
      refreshToken: user.refreshToken,
      refreshTokenExpiredAt: user.refreshTokenExpiredAt,
      user: user
    };
  }

  async logout(user: User) {
    if (user) {
      user.refreshToken = "";
      user.refreshTokenExpiredAt = "";
      await user.save();
    }

    return {};
  }

  getCookieOption() {
    const result = {};
    if (process.env.NODE_ENV !== "local") {
      result["domain"] = "just1s.xyz";
    }
    return result;
  }
}
