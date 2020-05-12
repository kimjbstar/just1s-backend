import { NbaseListResult } from "@src/common/types/nbase-list-result";
import { Type } from "class-transformer";
import { User } from "@src/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UserListResult extends NbaseListResult {
  @ApiProperty({
    type: User
  })
  @Type(() => User)
  users: User[];
}
