import { Request } from "express";
import { Controller, Get, Req, Post, Put, Delete } from "@nestjs/common";
import { ReviewsService } from "@src/modules/reviews/reviews.service";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async find(@Req() req: Request): Promise<any> {
    const reviews: object[] = await this.reviewsService.find(req);
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
