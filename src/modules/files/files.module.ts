import { Module } from "@nestjs/common";
import { FilesController } from "./files.controller";
import { FilesService } from "@src/modules/files/files.service";
import { UtilService } from "@src/services/util.service";

@Module({
  imports: [],
  controllers: [FilesController],
  providers: [UtilService, FilesService]
})
export class FilesModule {}
