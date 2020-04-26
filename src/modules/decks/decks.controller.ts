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
import { DecksService } from "@src/modules/decks/decks.service";
import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import {  DeckOrderbys } from "@src/modules/decks/deck.enum";

export class DeckListQuery {
    @ApiProperty({
        description: "제목을(를) 입력해주세요!",
    })
    title: string;
    @ApiProperty({
        description: "hitsCount을(를) 입력해주세요!",
    })
    hitsCount: number;
    @ApiProperty({
        description: "averageScore을(를) 입력해주세요!",
    })
    averageScore: number;
}

export class DeckCreateDto {
    @ApiProperty({
        description: "제목을(를) 입력해주세요!",
    })
    title: string;
    @ApiProperty({
        description: "hitsCount을(를) 입력해주세요!",
    })
    hitsCount: number;
    @ApiProperty({
        description: "averageScore을(를) 입력해주세요!",
    })
    averageScore: number;
}

@Controller("decks")
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Get()
  async find(@Query() query: DeckListQuery): Promise<any> {
    const decks: object[] = await this.decksService.find(query);
    const result = {
      decks: decks,
    };
    return result;
  }

  @Get(":id")
  @ApiQuery({ name: "id", description: "조회하실 id를 입력해주세요" })
  async get(@Param("id") id: Number): Promise<any> {
    const deck: Object = await this.decksService.findByPk(id);
    const result = {
      deck: deck,
    };
    return result;
  }

  @Post()
  async create(@Body() dto: DeckCreateDto): Promise<any> {
    const deck: Object = await this.decksService.create(dto);
    const result = {
      deck: deck,
    };
    return result;
  }

  @Put(":id")
  @ApiQuery({ name: "id", description: "업데이트하실 id를 입력해주세요" })
  async update(
    @Param("id") id: Number,
    @Body() dto: DeckCreateDto
  ): Promise<any> {
    const deck: Object = await this.decksService.update(id, dto);
    const result = {
      deck: deck,
    };
    return result;
  }

  @Delete(":id")
  @ApiQuery({ name: "id", description: "삭제하실 id를 입력해주세요" })
  async delete(@Param("id") id: Number): Promise<any> {
    const deck: Object = await this.decksService.destroy(id);
    const result = {
      deck: deck,
    };
    return result;
  }
}