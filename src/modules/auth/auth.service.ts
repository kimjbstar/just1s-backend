import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  // Promise<User>로 바꾸기
  async validateUser(email: string, password: string): Promise<any> {
    // TODO : 비밀번호 구버전 신버전 분리 처리
    // const user: User = await User.findOne({
    //   where: {
    //     email: email,
    //     [Op.and]: [
    //       Sequelize.literal(
    //         `pw = CONCAT("*", UPPER(SHA1(UNHEX(SHA1(SHA1("${password}"))))))`
    //       )
    //     ]
    //   }
    // });
    // if (user === null) {
    //   return null;
    // }
    // return user;
    return null;
  }

  async login(user) {
    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
