import { IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserSNSType } from "@src/modules/users/users.enum";

export class SNSLoginDto {
  // @IsEnum(UserSNSType)
  @ApiProperty({
    description: "UserSNSType(를) 입력해주세요 !",
    enum: Object.values(UserSNSType),
    default: UserSNSType.EMAIL
  })
  type: UserSNSType;

  @ApiProperty({
    description: "id을(를) 입력해주세요!"
  })
  id: string;

  @ApiProperty({
    description: "name을(를) 입력해주세요!"
  })
  name: string;

  @ApiProperty({
    description: "imgUrl을(를) 입력해주세요!"
  })
  imgUrl: string;
}
