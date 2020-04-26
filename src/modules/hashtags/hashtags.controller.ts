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
import { HashtagsService } from "@src/modules/hashtags/hashtags.service";
import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import {  HashtagOrderbys } from "@src/modules/hashtags/hashtag.enum";

export class HashtagListQuery {
    @ApiProperty({
        description: "이름을(를) 입력해주세요!",
    })
    name: string;
}

export class HashtagCreateDto {
    @ApiProperty({
        description: "이름을(를) 입력해주세요!",
    })
    name: string;
}

@Controller("hashtags")
export class HashtagsController {
  constructor(private readonly hashtagsService: HashtagsService) {}

  @Get()
  async find(@Query() query: HashtagListQuery): Promise<any> {
    const hashtags: object[] = await this.hashtagsService.find(query);
    const result = {
      hashtags: hashtags,
    };
    return result;
  }

  @Get(":id")
  @ApiQuery({ name: "id", description: "조회하실 id를 입력해주세요" })
  async get(@Param("id") id: Number): Promise<any> {
    const hashtag: Object = await this.hashtagsService.findByPk(id);
    const result = {
      hashtag: hashtag,
    };
    return result;
  }

  @Post()
  async create(@Body() dto: HashtagCreateDto): Promise<any> {
    const hashtag: Object = await this.hashtagsService.create(dto);
    const result = {
      hashtag: hashtag,
    };
    return result;
  }

  @Put(":id")
  @ApiQuery({ name: "id", description: "업데이트하실 id를 입력해주세요" })
  async update(
    @Param("id") id: Number,
    @Body() dto: HashtagCreateDto
  ): Promise<any> {
    const hashtag: Object = await this.hashtagsService.update(id, dto);
    const result = {
      hashtag: hashtag,
    };
    return result;
  }

  @Delete(":id")
  @ApiQuery({ name: "id", description: "삭제하실 id를 입력해주세요" })
  async delete(@Param("id") id: Number): Promise<any> {
    const hashtag: Object = await this.hashtagsService.destroy(id);
    const result = {
      hashtag: hashtag,
    };
    return result;
  }
}