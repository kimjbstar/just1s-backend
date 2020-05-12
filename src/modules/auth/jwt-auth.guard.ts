import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

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
        console.log(e);
      }
    }
    req.currentUser = currentUser;
    return true;
  }
}
