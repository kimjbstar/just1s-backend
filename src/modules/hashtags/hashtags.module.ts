import { Module } from "@nestjs/common";
import { HashtagsController } from "./hashtags.controller";
import { HashtagsService } from "@src/modules/hashtags/hashtags.service";
import { UtilService } from "@src/services/util.service";

@Module({
  imports: [],
  controllers: [HashtagsController],
  providers: [UtilService, HashtagsService]
})
export class HashtagsModule {}
