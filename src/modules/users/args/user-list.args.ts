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
    default: UserSNSType.EMAIL,
    required: false
  })
  snsType: UserSNSType;

  @IsOptional()
  @IsEnum(UserStatus)
  @ApiProperty({
    description: "status을(를) 입력해주세요 !",
    enum: Object.values(UserStatus),
    default: UserStatus.NORMAL,
    required: false
  })
  status: UserStatus;

  @ApiProperty({
    description: "email__like을(를) 입력해주세요 !",
    required: false
  })
  email__like: string;

  @ApiProperty({
    description: "name(를) 입력해주세요 !",
    required: false
  })
  name: string;

  @ApiProperty({
    description: "order을(를) 입력해주세요 !",
    enum: Object.keys(UserListOrderBys),
    required: false
  })
  order: string;

  @ApiProperty({
    description: "after을(를) 입력해주세요 !",
    required: false
  })
  after: number;
}
