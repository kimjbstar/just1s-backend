import { NbaseListResult } from "@src/common/types/nbase-list-result";
import { Type } from "class-transformer";
import { Perform } from "@src/entities/perform.entity";
import { ApiProperty } from "@nestjs/swagger";

export class PerformListResult extends NbaseListResult {
  @ApiProperty({
    type: Perform
  })
  @Type(() => Perform)
  performs: Perform[];
}
