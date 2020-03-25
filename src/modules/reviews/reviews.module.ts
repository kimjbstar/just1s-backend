import { Module } from "@nestjs/common";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "@src/modules/reviews/reviews.service";
import { UtilService } from "@src/services/util.service";

@Module({
  imports: [],
  controllers: [ReviewsController],
  providers: [UtilService, ReviewsService]
})
export class ReviewsModule {}
