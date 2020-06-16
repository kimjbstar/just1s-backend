import { IsOptional, IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { UserSNSType, UserStatus, UserListOrderBys } from "../users.enum";
import { NBaseListArgs } from "@src/common/types/nbase-list-args";

export class UserListArgs extends NBaseListArgs {
  @IsOptional()
  @IsEnum(UserSNSType)
  @ApiPropertyOptional({
    description: "UserSNSType(를) 입력해주세요 !",
    enum: UserSNSType,
    default: UserSNSType.EMAIL
  })
  snsType: UserSNSType;

  @IsOptional()
  @IsEnum(UserStatus)
  @ApiPropertyOptional({
    description: "status을(를) 입력해주세요 !",
    enum: UserStatus,
    default: UserStatus.NORMAL
  })
  status: UserStatus;

  @ApiPropertyOptional({
    description: "email__like을(를) 입력해주세요 !"
  })
  email__like: string;

  @ApiPropertyOptional({
    description: "name(를) 입력해주세요 !"
  })
  name: string;

  @ApiPropertyOptional({
    description: "orderBy을(를) 입력해주세요 !",
    enum: Object.keys(UserListOrderBys)
  })
  orderBy: string;
}
