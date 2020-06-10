import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Request, Response } from "express";
import { RefreshTokenExpiredException } from "./http-exception";

@Catch(RefreshTokenExpiredException)
export class RefreshTokenExpiredExceptionFilter implements ExceptionFilter {
  catch(exception: RefreshTokenExpiredException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.clearCookie("accessToken");
    response.clearCookie("refreshToken");

    response.status(exception.getStatus()).json(exception.getResponse());
  }
}
