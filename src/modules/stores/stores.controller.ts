import { Request } from "express";
import { Controller, Get, Req, Post, Put, Delete } from "@nestjs/common";
import { StoresService } from "@src/modules/stores/stores.service";

@Controller("stores")
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  async find(@Req() req: Request): Promise<any> {
    const stores: object[] = await this.storesService.find(req);
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

  @Put()
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
