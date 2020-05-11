import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class NBaseListArgs {
  constructor(obj?: object) {
    Object.assign(this, obj);
  }

  @ApiProperty({
    description: "after을(를) 입력해주세요!"
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  after?: number;

  @ApiProperty({
    description: "take을(를) 입력해주세요!"
  })
  @IsNumber()
  @Type(() => Number)
  take?: number = 24;

  @ApiProperty({
    description: "offset을(를) 입력해주세요!"
  })
  @IsNumber()
  @Type(() => Number)
  offset?: number = 0;
}
