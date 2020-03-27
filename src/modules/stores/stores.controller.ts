import { Request } from "express";
import { Controller, Get, Req, Post, Put, Delete, Query } from "@nestjs/common";
import { StoresService } from "@src/modules/stores/stores.service";
import { ApiProperty } from "@nestjs/swagger";

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

@Controller("stores")
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  async find(@Query() storeListQuery: StoreListQuery): Promise<any> {
    const stores: object[] = await this.storesService.findNewVer(
      StoreListQuery
    );
    const result = {
      stores: stores
    };
    return result;
  }

  @Get(":id")
  async get(@Req() req: Request): Promise<any> {
    const review: Object = await this.storesService.findByPk(req);
    const result = {
      review: review
    };
    return result;
  }

  @Post()
  async create(@Req() req: Request): Promise<any> {
    const review: Object = await this.storesService.create(req);
    const result = {
      review: review
    };
    return result;
  }

  @Put(":id")
  async update(@Req() req: Request): Promise<any> {
    const review: Object = await this.storesService.update(req);
    const result = {
      review: review
    };
    return result;
  }

  @Delete()
  async delete(@Req() req: Request): Promise<any> {
    const review: Object = await this.storesService.destroy(req);
    const result = {
      review: review
    };
    return result;
  }
}
