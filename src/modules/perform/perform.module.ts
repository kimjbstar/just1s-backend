import { Module } from "@nestjs/common";
import { PerformController } from "./perform.controller";
import { PerformsService } from "@src/modules/perform/perform.service";

@Module({
  imports: [],
  controllers: [PerformController],
  providers: [PerformsService]
})
export class PerformModule {}
