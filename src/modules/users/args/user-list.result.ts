import { NbaseListResult } from "@src/common/types/nbase-list-result";
import { Type } from "class-transformer";
import { User } from "@src/entities/user.entity";

export class UserListResult extends NbaseListResult {
  @Type(() => User)
  users: User[];
}
