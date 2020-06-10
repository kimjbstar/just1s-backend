import {
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "@src/modules/users/users.service";
import { TokenExpiredException } from "@src/common/http-exception";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // strict guard 접근 자체가 불가능해야할때
    // const res = await super.canActivate(context);
    // if (res === false) {
    //   return false;
    // }

    const req = context.switchToHttp().getRequest();

    let currentUser;
    if (req.headers.authorization?.startsWith("Bearer ")) {
      const token = req.headers.authorization.replace("Bearer ", "");
      try {
        const result = await this.jwtService.verifyAsync(token);
        currentUser = await this.usersService.findByPk(result["id"]);
      } catch (e) {
        if (e.name == "TokenExpiredError") {
          throw new TokenExpiredException(e.expiredAt);
        }
        throw new Error();
      }
    }
    req.currentUser = currentUser;
    return true;
  }
}
