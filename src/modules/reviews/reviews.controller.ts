import { Request } from "express";
import { Controller, Get, Req, Post, Put, Delete, Query } from "@nestjs/common";
import { ReviewsService } from "@src/modules/reviews/reviews.service";
import { ApiProperty } from "@nestjs/swagger";
import { ReviewStatus, ReviewType, ReviewOrderbys } from "@src/enums/review";

export class ReviewListQuery {
  @ApiProperty({
    description: "status을(를) 입력해주세요 !",
    enum: Object.values(ReviewStatus),
    default: ReviewStatus.NORMAL
  })
  status: string;
  @ApiProperty({
    description: "type을(를) 입력해주세요 !",
    enum: Object.values(ReviewType)
  })
  type: string;
  @ApiProperty({
    description: "title__like을(를) 입력해주세요 !"
  })
  title__like: string;
  @ApiProperty({
    description: "user__status을(를) 입력해주세요 !"
  })
  user__status: string;
  @ApiProperty({
    description: "user__name을(를) 입력해주세요 !"
  })
  user__name: string;
  @ApiProperty({
    type: Number,
    description: "price__gte을(를) 입력해주세요 !"
  })
  price__gte: number;
  @ApiProperty({
    description: "order을(를) 입력해주세요 !",
    enum: Object.keys(ReviewOrderbys)
  })
  order: string;
  @ApiProperty({
    description: "after을(를) 입력해주세요 !"
  })
  after: string;
}

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async find(@Query() reviewListQuery: ReviewListQuery): Promise<any> {
    const reviews: object[] = await this.reviewsService.findNewVer(
      reviewListQuery
    );
    const result = {
      reviews: reviews
    };
    return result;
  }

  @Get(":id")
  async get(@Req() req: Request): Promise<any> {
    const review: Object = await this.reviewsService.findByPk(req);
    const result = {
      review: review
    };
    return result;
  }

  @Post()
  async create(@Req() req: Request): Promise<any> {
    const review: Object = await this.reviewsService.create(req);
    const result = {
      review: review
    };
    return result;
  }

  @Put(":id")
  async update(@Req() req: Request): Promise<any> {
    const review: Object = await this.reviewsService.update(req);
    const result = {
      review: review
    };
    return result;
  }

  @Delete()
  async delete(@Req() req: Request): Promise<any> {
    const review: Object = await this.reviewsService.destroy(req);
    const result = {
      review: review
    };
    return result;
  }
}
