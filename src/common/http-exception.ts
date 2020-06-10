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

export class WrongIdException extends HttpException {
  constructor() {
    super("잘못된 ID입니다.", HttpStatus.FORBIDDEN);
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

export class AuthUserNotFoundException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        message: "ID에 해당하는 유저 정보가 없습니다.."
      },
      HttpStatus.FORBIDDEN
    );
  }
}

export class AuthUserPasswordNotValidException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        message: "비밀번호가 틀립니다."
      },
      HttpStatus.FORBIDDEN
    );
  }
}
export class AuthLoginFailException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        message: "로그인 정보가 잘못되었습니다."
      },
      HttpStatus.FORBIDDEN
    );
  }
}

export class WrongRequestBody extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        message: "요청 정보가 잘못되었습니다."
      },
      HttpStatus.FORBIDDEN
    );
  }
}

export class CustomException extends HttpException {
  constructor(str: string) {
    super(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: str
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

export class TokenExpiredException extends HttpException {
  constructor(expiredAt: number) {
    super(
      {
        status: HttpStatus.UNAUTHORIZED,
        message: "토큰이 만료되었습니다.",
        expiredAt: expiredAt
      },
      HttpStatus.UNAUTHORIZED
    );
  }
}

export class RefreshTokenExpiredException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.UNAUTHORIZED,
        message: "refresh token이 잘못되거나 만료되었습니다."
      },
      HttpStatus.UNAUTHORIZED
    );
  }
}

export class NotLogginedException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.UNAUTHORIZED,
        message: "로그인되어 있지 않습니다."
      },
      HttpStatus.UNAUTHORIZED
    );
  }
}
