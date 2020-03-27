import { UserRole, UserStatus, UserOrderbys } from "@src/enums/user";
import { ApiProperty } from "@nestjs/swagger";
import { Request } from "express";
import { Controller, Get, Req, Post, Put, Delete, Query } from "@nestjs/common";
import { UsersService } from "@src/modules/users/users.service";

export class UserListQuery {
  @ApiProperty({
    description: "role을(를) 입력해주세요 !",
    enum: Object.values(UserRole),
    default: UserRole.NORMAL
  })
  role: UserRole;
  @ApiProperty({
    description: "status을(를) 입력해주세요 !",
    enum: Object.values(UserStatus),
    default: UserStatus.NORMAL
  })
  status: UserStatus;
  @ApiProperty({
    description: "email__like을(를) 입력해주세요 !"
  })
  email__like: string;
  @ApiProperty({
    description: "order을(를) 입력해주세요 !",
    enum: Object.keys(UserOrderbys)
  })
  order: string;
  @ApiProperty({
    description: "after을(를) 입력해주세요 !"
  })
  after: number;
}

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async find(@Query() userListQuery: UserListQuery): Promise<any> {
    const users: object[] = await this.usersService.findNewVer(UserListQuery);
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
