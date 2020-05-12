import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class NBaseListArgs {
  constructor(obj?: object) {
    Object.assign(this, obj);
  }

  @ApiPropertyOptional({
    description: "after을(를) 입력해주세요!"
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  after?: number;

  @ApiPropertyOptional({
    description: "take을(를) 입력해주세요!"
  })
  @IsNumber()
  @Type(() => Number)
  take?: number = 24;

  @ApiPropertyOptional({
    description: "offset을(를) 입력해주세요!"
  })
  @IsNumber()
  @Type(() => Number)
  offset?: number = 0;
}
