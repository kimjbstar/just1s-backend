import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req["currentUser"];
  }
);
