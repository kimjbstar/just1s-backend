import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@src/entities/user.entity";
import { UsersService } from "../users/users.service";
import {
  NotLogginedException,
  CustomException,
  RefreshTokenExpiredException,
  UserNotExistException,
  PasswordWrongException
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

    if (user === undefined || user === null) {
      throw new UserNotExistException();
    }
    if (user.pw !== User.getHashedPw(password)) {
      throw new PasswordWrongException();
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
}
