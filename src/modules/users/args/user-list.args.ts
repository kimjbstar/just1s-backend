import { IsOptional, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserSNSType, UserStatus, UserListOrderBys } from "../users.enum";
import { NBaseListArgs } from "@src/common/types/nbase-list-args";

export class UserListArgs extends NBaseListArgs {
  @IsOptional()
  @IsEnum(UserSNSType)
  @ApiProperty({
    description: "UserSNSType(를) 입력해주세요 !",
    enum: Object.values(UserSNSType),
    default: UserSNSType.EMAIL
  })
  snsType: UserSNSType;

  @IsOptional()
  @IsEnum(UserStatus)
  @ApiProperty({
    description: "status을(를) 입력해주세요 !",
    enum: Object.values(UserStatus),
    default: UserStatus.NORMAL
  })
  status: UserStatus;

  @ApiProperty({
    description: "email__like을(를) 입력해주세요 !"
  })
  email__like: string;

  @ApiProperty({
    description: "name(를) 입력해주세요 !"
  })
  name: string;

  @ApiProperty({
    description: "order을(를) 입력해주세요 !",
    enum: Object.keys(UserListOrderBys)
  })
  order: string;

  @ApiProperty({
    description: "after을(를) 입력해주세요 !"
  })
  after: number;
}
