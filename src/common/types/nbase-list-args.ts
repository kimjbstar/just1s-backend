import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { Type, Transform } from "class-transformer";

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
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  take?: number;

  @ApiPropertyOptional({
    description: "offset을(를) 입력해주세요!"
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset?: number = 0;
}
