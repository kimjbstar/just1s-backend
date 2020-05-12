import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export const CurrentUser = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req["currentUser"];
  }
);
