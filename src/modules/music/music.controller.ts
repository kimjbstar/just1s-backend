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
import { MusicsService } from "@src/modules/music/music.service";
import { ApiProperty, ApiQuery, ApiTags, ApiResponse } from "@nestjs/swagger";
import { MusicListArgs } from "./args/music-list.args";
import { MusicCreateDto } from "./dtos/music-create.dto";
import { MusicListResult } from "./args/music-list.result";
import { NBaseCreateListConfig } from "@src/common/types/nbase-entity";
import { Equal, Like } from "typeorm";
import { MusicListOrderBys } from "@src/modules/music/music.enum";
import { Music } from "@src/entities/music.entity";

const createMusicListConfig: NBaseCreateListConfig = {
  argsResolver: {
    title: (args) => {
      return {
        title: Equal(args.title)
      };
    },
    artist: (args) => {
      return {
        artist: Equal(args.artist)
      };
    },
    artist__like: (args) => {
      return {
        artist: Like(`%${args.name}%`)
      };
    },
    email: (args) => {
      return {
        email: Equal(args.email)
      };
    },
    name: (args) => {
      return {
        name: Like(`%${args.name}%`)
      };
    }
  },
  orderByResolver: {
    [MusicListOrderBys.ID__DESC]: {
      cursor: "music.id",
      orderBy: {
        "music.id": "DESC"
      }
    }
  }
};
@ApiTags("musics")
@Controller("musics")
export class MusicController {
  constructor(private readonly musicService: MusicsService) {}

  @Get()
  @ApiResponse({
    description: "Music의 리스트를 가져옵니다.",
    type: MusicListResult
  })
  async find(@Query() args: MusicListArgs): Promise<any> {
    return await Music.createList(MusicListResult, createMusicListConfig, args);
  }

  @Get(":id")
  @ApiResponse({
    description: "id에 해당하는 Music을 출력합니다.",
    type: Music
  })
  @ApiQuery({ name: "id", description: "조회하실 id를 입력해주세요" })
  async get(@Param("id", ParseIntPipe) id: Number): Promise<any> {
    return await this.musicService.findByPk(id);
  }

  @Post()
  @ApiResponse({
    description: "dto에 해당하는 Music을 생성하여 출력합니다.",
    type: Music
  })
  async create(@Body() dto: MusicCreateDto): Promise<any> {
    return await this.musicService.create(dto);
  }

  @Put(":id")
  @ApiResponse({
    description: "id에 해당하는 Music을 dto를 통해 업데이트하여 출력합니다.",
    type: Music
  })
  @ApiQuery({ name: "id", description: "업데이트하실 id를 입력해주세요." })
  async update(
    @Param("id", ParseIntPipe) id: Number,
    @Body() dto: MusicCreateDto
  ): Promise<any> {
    return this.musicService.update(id, dto);
  }

  @Delete(":id")
  @ApiResponse({
    description: "id에 해당하는 Music을 삭제합니다."
  })
  @ApiQuery({ name: "id", description: "삭제하실 id를 입력해주세요" })
  async delete(@Param("id", ParseIntPipe) id: Number): Promise<any> {
    return await this.musicService.destroy(id);
  }

  @Post(":id/check_correct")
  @ApiResponse({
    description: "해당하는 answer가 correct 한지 check"
  })
  async checkCorrect(
    @Param("id", ParseIntPipe) id: Number,
    @Body("answer") answer: string
  ): Promise<any> {
    return await this.musicService.checkCorrect(id, answer);
  }

  @Post(":id/foo")
  async foo(@Param("id", ParseIntPipe) id: Number): Promise<any> {
    console.log(id);
    return {
      foo: "bar"
    };
  }
}
