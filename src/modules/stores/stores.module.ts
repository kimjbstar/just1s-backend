import { Module } from "@nestjs/common";
import { StoresController } from "./stores.controller";
import { StoresService } from "@src/modules/stores/stores.service";
import { UtilService } from "@src/services/util.service";

@Module({
  imports: [],
  controllers: [StoresController],
  providers: [UtilService, StoresService]
})
export class StoresModule {}
