import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@src/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async validateUser(email: string, password: string): Promise<User> {
    // TODO : 비밀번호 구버전 신버전 분리 처리
    // 비밀번호는 검증안함
    const user: User = await User.findOne({
      where: {
        email: email
      }
    });
    if (user === undefined || user === null) {
      return null;
    }
    // TODO : snsType, role 등 추가 체크
    if (user.pw !== User.getHashedPw(password)) {
      return null;
    }
    return user;
  }

  async login(user) {
    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: user
    };
  }
}
