import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body
} from "@nestjs/common";
import { MusicsService } from "@src/modules/music/music.service";
import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { MusicOrderbys } from "@src/modules/music/music.enum";
import { classToPlain } from "class-transformer";

export class MusicListQuery {
  @ApiProperty({
    description: "제목을(를) 입력해주세요!"
  })
  title: string;
  @ApiProperty({
    description: "artist을(를) 입력해주세요!"
  })
  artist: string;
  @ApiProperty({
    description: "link을(를) 입력해주세요!"
  })
  link: string;
  @ApiProperty({
    description: "averageScore을(를) 입력해주세요!"
  })
  averageScore: number;
  @ApiProperty({
    description: "belogsDecksCount을(를) 입력해주세요!"
  })
  belogsDecksCount: number;
  @ApiProperty({
    description: "performsCount을(를) 입력해주세요!"
  })
  performsCount: number;
}

export class MusicCreateDto {
  @ApiProperty({
    description: "제목을(를) 입력해주세요!"
  })
  title: string;
  @ApiProperty({
    description: "artist을(를) 입력해주세요!"
  })
  artist: string;
  @ApiProperty({
    description: "link을(를) 입력해주세요!"
  })
  link: string;
}

@Controller("musics")
export class MusicController {
  constructor(private readonly musicService: MusicsService) {}

  @Get()
  async find(@Query() query: MusicListQuery): Promise<any> {
    const musics: object[] = await this.musicService.find(query);
    const result = {
      music: musics.map((music) => {
        return classToPlain(music);
      })
    };
    return result;
  }

  @Get(":id")
  @ApiQuery({ name: "id", description: "조회하실 id를 입력해주세요" })
  async get(@Param("id") id: Number): Promise<any> {
    const music: Object = await this.musicService.findByPk(id);
    const result = {
      music: classToPlain(music)
    };
    return result;
  }

  @Post()
  async create(@Body() dto: MusicCreateDto): Promise<any> {
    const music: Object = await this.musicService.create(dto);
    const result = {
      music: classToPlain(music)
    };
    return result;
  }

  @Put(":id")
  @ApiQuery({ name: "id", description: "업데이트하실 id를 입력해주세요" })
  async update(
    @Param("id") id: Number,
    @Body() dto: MusicCreateDto
  ): Promise<any> {
    const music: Object = await this.musicService.update(id, dto);
    const result = {
      music: classToPlain(music)
    };
    return result;
  }

  @Delete(":id")
  @ApiQuery({ name: "id", description: "삭제하실 id를 입력해주세요" })
  async delete(@Param("id") id: Number): Promise<any> {
    const music: Object = await this.musicService.destroy(id);
    const result = {
      music: classToPlain(music)
    };
    return result;
  }
}
