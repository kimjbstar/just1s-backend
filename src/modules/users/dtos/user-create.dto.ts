import { IsNotEmpty, IsEnum, IsEmail } from "class-validator";
import { UserSNSType, UserStatus } from "../users.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto {
  @IsNotEmpty()
  @IsEnum(UserSNSType)
  @ApiProperty({
    description: "UserSNSType(를) 입력해주세요 !",
    enum: Object.values(UserSNSType)
  })
  snsType: UserSNSType;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @ApiProperty({
    description: "stringId을(를) 입력해주세요 !"
  })
  stringId: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "pw을(를) 입력해주세요 !"
  })
  pw: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "imgUrl을(를) 입력해주세요 !"
  })
  imgUrl: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "nickname을(를) 입력해주세요 !"
  })
  nickname: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "name을(를) 입력해주세요 !"
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "phoneNumber을(를) 입력해주세요 !"
  })
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "desc을(를) 입력해주세요 !"
  })
  desc: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "blockedUntil을(를) 입력해주세요 !"
  })
  blockedUntil: Date;
  @IsNotEmpty()
  @ApiProperty({
    description: "toGetPushed을(를) 입력해주세요 !"
  })
  toGetPushed: boolean;
}
