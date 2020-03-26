import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "@src/modules/users/users.service";
import { UtilService } from "@src/services/util.service";

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UtilService, UsersService]
})
export class UsersModule {}
