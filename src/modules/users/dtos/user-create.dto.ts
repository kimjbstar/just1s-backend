import { IsNotEmpty, IsEnum, IsEmail } from "class-validator";
import { UserSNSType, UserStatus } from "../users.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto {
  @IsEnum(UserSNSType)
  @ApiProperty({
    description: "UserSNSType(를) 입력해주세요 !",
    enum: Object.values(UserSNSType)
  })
  snsType: UserSNSType;

  @IsEnum(UserStatus)
  @ApiProperty({
    description: "status을(를) 입력해주세요 !",
    enum: Object.values(UserStatus)
  })
  status: UserStatus;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "email을(를) 입력해주세요 !"
  })
  email: string;

  @ApiProperty({
    description: "name을(를) 입력해주세요 !"
  })
  name: string;
}
