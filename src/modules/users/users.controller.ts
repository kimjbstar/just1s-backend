import { Request } from "express";
import { Controller, Get, Req, Post, Put, Delete } from "@nestjs/common";
import { UsersService } from "@src/modules/users/users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async find(@Req() req: Request): Promise<any> {
    const users: object[] = await this.usersService.find(req);
    const result = {
      users: users
    };
    return result;
  }

  @Get(":id")
  async get(@Req() req: Request): Promise<any> {
    const user: Object = await this.usersService.findByPk(req);
    const result = {
      user: user
    };
    return result;
  }

  @Post()
  async create(@Req() req: Request): Promise<any> {
    const user: Object = await this.usersService.create(req);
    const result = {
      user: user
    };
    return result;
  }

  @Put(":id")
  async update(@Req() req: Request): Promise<any> {
    const user: Object = await this.usersService.update(req);
    const result = {
      user: user
    };
    return result;
  }

  @Delete()
  async delete(@Req() req: Request): Promise<any> {
    const user: Object = await this.usersService.destroy(req);
    const result = {
      user: user
    };
    return result;
  }
}
