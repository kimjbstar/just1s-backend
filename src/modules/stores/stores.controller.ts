import { Request } from "express";
import {
  Controller,
  Get,
  Req,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body
} from "@nestjs/common";
import { StoresService } from "@src/modules/stores/stores.service";
import { ApiProperty, ApiQuery } from "@nestjs/swagger";

export class StoreListQuery {
  @ApiProperty({
    description: "level을(를) 입력해주세요 !"
  })
  level: string;
  @ApiProperty({
    description: "status을(를) 입력해주세요 !"
  })
  status: string;
  @ApiProperty({
    description: "name을(를) 입력해주세요 !"
  })
  name: string;
  @ApiProperty({
    description: "tel을(를) 입력해주세요 !"
  })
  tel: string;
  @ApiProperty({
    description: "phoneNumber을(를) 입력해주세요 !"
  })
  phoneNumber: string;
  @ApiProperty({
    description: "name__like을(를) 입력해주세요 !"
  })
  name__like: string;
  @ApiProperty({
    description: "level__lte을(를) 입력해주세요 !"
  })
  level__lte: number;
  @ApiProperty({
    description: "level__gte을(를) 입력해주세요 !"
  })
  level__gte: number;
  @ApiProperty({
    description: "level__between을(를) 입력해주세요 !"
  })
  level__between: string;
  @ApiProperty({
    description: "user__status을(를) 입력해주세요 !"
  })
  user__status: string;
  @ApiProperty({
    description: "category__name을(를) 입력해주세요 !"
  })
  category__name: string;
  @ApiProperty({
    description: "order을(를) 입력해주세요 !"
  })
  order: string;
  @ApiProperty({
    description: "after을(를) 입력해주세요 !"
  })
  after: string;
}

export class StoreCreateDto {
  @ApiProperty({
    description: "level을(를) 입력해주세요 !"
  })
  level: string;
  @ApiProperty({
    description: "status을(를) 입력해주세요 !"
  })
  status: string;
  @ApiProperty({
    description: "name을(를) 입력해주세요 !"
  })
  name: string;
  @ApiProperty({
    description: "tel을(를) 입력해주세요 !"
  })
  tel: string;
  @ApiProperty({
    description: "phoneNumber을(를) 입력해주세요 !"
  })
  phoneNumber: string;
}

@Controller("stores")
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  async find(@Query() query: StoreListQuery): Promise<any> {
    const stores: object[] = await this.storesService.find(query);
    const result = {
      stores: stores
    };
    return result;
  }

  @Get(":id")
  @ApiQuery({ name: "id", description: "조회하실 id를 입력해주세요" })
  async get(@Param("id") id: Number): Promise<any> {
    const store: Object = await this.storesService.findByPk(id);
    const result = {
      store: store
    };
    return result;
  }

  @Post()
  async create(@Body() dto: StoreCreateDto): Promise<any> {
    const store: Object = await this.storesService.create(dto);
    const result = {
      store: store
    };
    return result;
  }

  @Put(":id")
  @ApiQuery({ name: "id", description: "업데이트하실 id를 입력해주세요" })
  async update(
    @Param("id") id: Number,
    @Body() dto: StoreCreateDto
  ): Promise<any> {
    const store: Object = await this.storesService.update(id, dto);
    const result = {
      store: store
    };
    return result;
  }

  @Delete(":id")
  @ApiQuery({ name: "id", description: "삭제하실 id를 입력해주세요" })
  async delete(@Param("id") id: Number): Promise<any> {
    const store: Object = await this.storesService.destroy(id);
    const result = {
      store: store
    };
    return result;
  }
}
