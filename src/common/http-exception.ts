import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common";

export class ForbiddenException extends HttpException {
  constructor() {
    super("Forbidden", HttpStatus.FORBIDDEN);
  }
}

export class MissingParameterIDException extends HttpException {
  constructor() {
    super("id가 필요합니다.", HttpStatus.FORBIDDEN);
  }
}

export class DataNotFoundException extends HttpException {
  constructor() {
    super("데이터가 없습니다.", HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class MissingBodyToCreateException extends HttpException {
  constructor() {
    super("추가할 데이터가 없습니다.", HttpStatus.FORBIDDEN);
  }
}

export class MissingBodyToUpdateException extends HttpException {
  constructor() {
    super("업데이트할 데이터가 없습니다.", HttpStatus.FORBIDDEN);
  }
}

export class UnexpectedUpdateResultException extends HttpException {
  constructor() {
    super("의도치 않은 업데이트 액션입니다.", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class UnexpectedDeleteResultException extends HttpException {
  constructor() {
    super("의도치 않은 삭제 액션입니다.", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class TokenAuthenticateFailException extends HttpException {
  constructor() {
    super("토큰 인증에 실패했습니다.", HttpStatus.UNAUTHORIZED);
  }
}
// next(new NBaseError(401, "token 인증 실패", res.locals.tokenFailMessage));
// HttpExceptionFilter 필요;
