import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  ParseIntPipe,
  Header,
  Req,
  UseGuards
} from "@nestjs/common";
import { DecksService } from "@src/modules/decks/decks.service";
import {
  ApiQuery,
  ApiTags,
  ApiResponseProperty,
  ApiResponse
} from "@nestjs/swagger";
import { Perform } from "@src/entities/perform.entity";
import { DeckListArgs } from "./args/deck-list.args";
import { DeckCreateDto } from "./dtos/deck-create.dto";
import { DeckPerformDto } from "./dtos/deck-perform.dto";
import { NBaseCreateListConfig } from "@src/common/types/nbase-entity";
import { DeckListOrderBys } from "./deck.enum";
import { Equal, Like } from "typeorm";
import { DeckListResult } from "./args/deck-list.result";
import { Deck } from "@src/entities/deck.entity";
import { DeckHashtagSaveDto } from "./dtos/deck-hashtag-save.dto";
import { DeckMusicSaveDto } from "./dtos/deck-music-save.dto";
import { DeckUpdateDto } from "./dtos/deck-update.dto";
import { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "../users/users.service";

const createDeckListConfig: NBaseCreateListConfig = {
  // customize: (builder) => {
  //   // return builder.innerJoin("deck.hashtags", "deck_hashtag");
  //   return builder.leftJoinAndSelect("deck.hashtags", "deck_hashtag");
  // },
  exclusiveKeyLists: [
    ["has_hashtag", "hashtag", "with_hashtag"],
    ["has_music", "music_title"]
  ],
  argsResolver: {
    title: (args) => {
      return {
        title: Like(`%${args.title}%`)
      };
    },
    userId: (args) => {
      return {
        user: {
          id: Equal(args.userId)
        }
      };
    },
    with_performed_user_id: (args, builder) => {
      return builder.leftJoinAndSelect(
        "deck.performs",
        "perform",
        "perform.userId = :userId",
        {
          userId: args.with_performed_user_id
        }
      );
    },
    performed_user_id: (args, builder) => {
      return builder
        .leftJoinAndSelect("deck.performs", "perform")
        .innerJoinAndSelect(
          "perform.user",
          "performed_user",
          "performed_user.id = :id",
          {
            id: args.performed_user_id
          }
        );
    },
    has_hashtag: (args, builder) => {
      return builder.innerJoinAndSelect("deck.hashtags", "deck_hashtag");
    },
    with_hashtag: (args, builder) => {
      return builder.leftJoinAndSelect("deck.hashtags", "deck_hashtag");
    },
    hashtag: (args, builder) => {
      return builder.innerJoinAndMapMany(
        "deck.hashtags",
        "deck_hashtag",
        "hashtag_alias",
        `hashtag_alias.deckId = deck.id AND hashtag_alias.hashtag LIKE '%${args.hashtag}%'`
      );
    },
    has_music: (args, builder) => {
      return builder
        .innerJoinAndSelect("deck.deckMusics", "deck_music")
        .innerJoinAndSelect("deck_music.music", "music");
    },
    music_title: (args, builder) => {
      return builder
        .innerJoinAndSelect("deck.deckMusics", "deck_music")
        .innerJoinAndSelect(
          "deck_music.music",
          "music",
          "music.title = :title",
          { title: args.music_title }
        );
    }
  },
  orderByResolver: {
    [DeckListOrderBys.ID__DESC]: {
      cursor: "deck.id",
      orderBy: {
        "deck.id": "DESC"
      }
    },
    [DeckListOrderBys.ID__ASC]: {
      cursor: "deck.id",
      orderBy: {
        "deck.id": "ASC"
      }
    }
  }
};
@ApiTags("decks")
@Controller("decks")
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Get()
  @ApiResponse({
    description: "Deck의 리스트를 가져옵니다.",
    type: DeckListResult
  })
  @UseGuards(JwtAuthGuard)
  async find(@Query() args: DeckListArgs, @Req() req: Request): Promise<any> {
    if (req["currentUser"]) {
      args["with_performed_user_id"] = req["currentUser"].id;
    }
    return await Deck.createList(DeckListResult, createDeckListConfig, args);
  }

  @Get(":id")
  @ApiResponse({
    description: "id에 해당하는 Deck을 출력합니다.",
    type: Deck
  })
  @ApiQuery({ name: "id", description: "조회하실 id를 입력해주세요" })
  async get(@Param("id", ParseIntPipe) id: number): Promise<any> {
    return await this.decksService.findByPk(id);
  }

  @Post()
  @ApiResponse({
    description: "dto에 해당하는 Deck을 생성하여 출력합니다.",
    type: Deck
  })
  async create(@Body() dto: DeckCreateDto): Promise<any> {
    return await this.decksService.create(dto);
  }

  @Put(":id")
  @ApiResponse({
    description: "id에 해당하는 Deck을 dto를 통해 업데이트하여 출력합니다.",
    type: Deck
  })
  @ApiQuery({ name: "id", description: "업데이트하실 id를 입력해주세요." })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: DeckUpdateDto
  ): Promise<any> {
    return await this.decksService.update(id, dto);
  }

  @Delete(":id")
  @ApiResponse({
    description: "id에 해당하는 Deck을 삭제합니다."
  })
  @ApiQuery({ name: "id", description: "삭제하실 id를 입력해주세요" })
  async delete(@Param("id", ParseIntPipe) id: number): Promise<any> {
    return await this.decksService.destroy(id);
  }

  @Post("perform")
  @ApiResponse({
    description: "해당하는 deck을 수행하고 그에 해당하는 perform을 돌려줍니다.",
    type: Perform
  })
  async perform(
    @Body() dto: DeckPerformDto,
    @Req() req: Request
  ): Promise<Perform> {
    const _ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const ipAddress = Array.isArray(_ipAddress)
      ? _ipAddress.join(",")
      : _ipAddress;
    return await this.decksService.perform(dto, ipAddress);
  }

  // inline form test
  @Post(":id/hashtags")
  @ApiResponse({
    description: "dto에 해당하는 Deck을 생성하여 출력합니다.",
    type: Deck
  })
  async saveHashtags(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: DeckHashtagSaveDto[]
  ): Promise<any> {
    return await this.decksService.saveHashtags(id, dto);
  }

  @Post(":id/musics")
  @ApiResponse({
    description: "dto에 해당하는 Deck을 생성하여 출력합니다.",
    type: Deck
  })
  async saveMusics(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: DeckMusicSaveDto[]
  ): Promise<any> {
    return await this.decksService.saveDeckMusics(id, dto);
  }
}
