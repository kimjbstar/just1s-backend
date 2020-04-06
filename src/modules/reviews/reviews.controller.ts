import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
} from "@nestjs/common";
import { ReviewsService } from "@src/modules/reviews/reviews.service";
import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import {
  ReviewStatus,
  ReviewType,
  ReviewOrderbys,
} from "@src/modules/reviews/review.enum";

export class ReviewListQuery {
  @ApiProperty({
    description: "status을(를) 입력해주세요 !",
    enum: Object.values(ReviewStatus),
    default: ReviewStatus.NORMAL,
  })
  status: string;
  @ApiProperty({
    description: "type을(를) 입력해주세요 !",
    enum: Object.values(ReviewType),
  })
  type: string;
  @ApiProperty({
    description: "title__like을(를) 입력해주세요 !",
  })
  title__like: string;
  @ApiProperty({
    description: "user__status을(를) 입력해주세요 !",
  })
  user__status: string;
  @ApiProperty({
    description: "user__name을(를) 입력해주세요 !",
  })
  user__name: string;
  @ApiProperty({
    type: Number,
    description: "price__gte을(를) 입력해주세요 !",
  })
  price__gte: number;
  @ApiProperty({
    description: "order을(를) 입력해주세요 !",
    enum: Object.keys(ReviewOrderbys),
  })
  order: string;
  @ApiProperty({
    description: "after을(를) 입력해주세요 !",
  })
  after: string;
}

export class ReviewCreateDto {
  @ApiProperty({
    description: "type을(를) 입력해주세요 !",
    enum: Object.values(ReviewType),
  })
  type: ReviewType;
  @ApiProperty({
    description: "status을(를) 입력해주세요 !",
    enum: Object.values(ReviewStatus),
  })
  status: ReviewStatus;
  @ApiProperty({
    description: "title을(를) 입력해주세요 !",
  })
  title: string;
  @ApiProperty({
    description: "content을(를) 입력해주세요 !",
  })
  content: string;
  @ApiProperty({
    description: "workingHours을(를) 입력해주세요 !",
  })
  workingHours: number;
  @ApiProperty({
    description: "price을(를) 입력해주세요 !",
  })
  price: number;
  @ApiProperty({
    description: "beforeImgUrl을(를) 입력해주세요 !",
  })
  beforeImgUrl: string;
  @ApiProperty({
    description: "repImgUrl을(를) 입력해주세요 !",
  })
  repImgUrl: string;
  @ApiProperty({
    description: "repliesCount을(를) 입력해주세요 !",
  })
  repliesCount: number;
  @ApiProperty({
    description: "likesCount을(를) 입력해주세요 !",
  })
  likesCount: number;
  @ApiProperty({
    description: "hitsCount을(를) 입력해주세요 !",
  })
  hitsCount: number;
  @ApiProperty({
    description: "adminHitsCount을(를) 입력해주세요 !",
  })
  adminHitsCount: number;
  @ApiProperty({
    description: "carModelId을(를) 입력해주세요 !",
  })
  carModelId: number;
  @ApiProperty({
    description: "reviewCategoryId을(를) 입력해주세요 !",
  })
  reviewCategoryId: number;
  @ApiProperty({
    description: "userId을(를) 입력해주세요 !",
  })
  userId: number;
  @ApiProperty({
    description: "storeId을(를) 입력해주세요 !",
  })
  storeId: number;
  @ApiProperty({
    description: "이미지을(를) 입력해주세요 !",
  })
  images: string[];
}

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async find(@Query() query: ReviewListQuery): Promise<any> {
    const reviews: object[] = await this.reviewsService.find(query);
    const result = {
      reviews: reviews,
    };
    return result;
  }

  @Get(":id")
  @ApiQuery({ name: "id", description: "조회하실 id를 입력해주세요" })
  async get(@Param("id") id: Number): Promise<any> {
    const review: Object = await this.reviewsService.findByPk(id);
    const result = {
      review: review,
    };
    return result;
  }

  @Post()
  async create(@Body() dto: ReviewCreateDto): Promise<any> {
    const review: Object = await this.reviewsService.create(dto);
    const result = {
      review: review,
    };
    return result;
  }

  @Put(":id")
  @ApiQuery({ name: "id", description: "업데이트하실 id를 입력해주세요" })
  async update(
    @Param("id") id: Number,
    @Body() dto: ReviewCreateDto
  ): Promise<any> {
    const review: Object = await this.reviewsService.update(id, dto);
    const result = {
      review: review,
    };
    return result;
  }

  @Delete(":id")
  @ApiQuery({ name: "id", description: "삭제하실 id를 입력해주세요" })
  async delete(@Param("id") id: Number): Promise<any> {
    const review: Object = await this.reviewsService.destroy(id);
    const result = {
      review: review,
    };
    return result;
  }
}
