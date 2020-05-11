import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  ParseIntPipe
} from "@nestjs/common";
import { DecksService } from "@src/modules/decks/decks.service";
import { ApiQuery } from "@nestjs/swagger";
import { classToPlain } from "class-transformer";
import { Perform } from "@src/entities/perform.entity";
import { DeckListArgs } from "./args/deck-list.args";
import { DeckCreateDto } from "./dtos/deck-create.dto";
import { DeckPerformDto } from "./dtos/deck-perform.dto";

@Controller("decks")
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Get()
  async find(@Query() query: DeckListArgs): Promise<any> {
    const decks: object[] = await this.decksService.find(query);
    const result = {
      decks: decks.map((deck) => {
        return classToPlain(deck);
      })
    };
    return result;
  }

  @Get(":id")
  @ApiQuery({ name: "id", description: "조회하실 id를 입력해주세요" })
  async get(@Param("id", ParseIntPipe) id: Number): Promise<any> {
    console.log(id);
    const deck: Object = await this.decksService.findByPk(id);
    const result = {
      deck: classToPlain(deck)
    };
    return result;
  }

  @Post()
  async create(@Body() dto: DeckCreateDto): Promise<any> {
    const deck: Object = await this.decksService.create(dto);
    const result = {
      deck: classToPlain(deck)
    };
    return result;
  }

  @Put(":id")
  @ApiQuery({ name: "id", description: "업데이트하실 id를 입력해주세요" })
  async update(
    @Param("id", ParseIntPipe) id: Number,
    @Body() dto: DeckCreateDto
  ): Promise<any> {
    const deck: Object = await this.decksService.update(id, dto);
    const result = {
      deck: deck
    };
    return result;
  }

  @Delete(":id")
  @ApiQuery({ name: "id", description: "삭제하실 id를 입력해주세요" })
  async delete(@Param("id", ParseIntPipe) id: Number): Promise<any> {
    const deck: Object = await this.decksService.destroy(id);
    const result = {
      deck: classToPlain(deck)
    };
    return result;
  }

  @Post("register")
  async register(@Body() dto: DeckCreateDto): Promise<any> {
    console.log(dto);
    const deck: Object = await this.decksService.register(dto);
    const result = {
      deck: classToPlain(deck)
    };
    return result;
  }

  @Post("perform")
  async perform(@Body() dto: DeckPerformDto): Promise<any> {
    const perform: Perform = await this.decksService.perform(dto);
    const result = {
      perform: classToPlain(perform)
    };
    return result;
  }
}
