import { UserRole, UserStatus, UserOrderbys } from "@src/enums/user";
import { ApiProperty, ApiQuery } from "@nestjs/swagger";
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

export class UserCreateDto {
  @ApiProperty({
    description: "role을(를) 입력해주세요 !",
    enum: Object.values(UserRole)
  })
  role: UserRole;
  @ApiProperty({
    description: "status을(를) 입력해주세요 !",
    enum: Object.values(UserStatus)
  })
  status: UserStatus;
  @ApiProperty({
    description: "email을(를) 입력해주세요 !"
  })
  email: string;
  @ApiProperty({
    description: "stringId을(를) 입력해주세요 !"
  })
  stringId: string;
  @ApiProperty({
    description: "pw을(를) 입력해주세요 !"
  })
  pw: string;
  @ApiProperty({
    description: "imgUrl을(를) 입력해주세요 !"
  })
  imgUrl: string;
  @ApiProperty({
    description: "nickname을(를) 입력해주세요 !"
  })
  nickname: string;
  @ApiProperty({
    description: "name을(를) 입력해주세요 !"
  })
  name: string;
  @ApiProperty({
    description: "phoneNumber을(를) 입력해주세요 !"
  })
  phoneNumber: string;
  @ApiProperty({
    description: "desc을(를) 입력해주세요 !"
  })
  desc: string;

  @ApiProperty({
    description: "blockedUntil을(를) 입력해주세요 !"
  })
  blockedUntil: Date;
  @ApiProperty({
    description: "toGetPushed을(를) 입력해주세요 !"
  })
  toGetPushed: boolean;
}

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async find(@Query() query: UserListQuery): Promise<any> {
    const users: object[] = await this.usersService.find(query);
    const result = {
      users: users
    };
    return result;
  }

  @Get(":id")
  @ApiQuery({ name: "id", description: "조회하실 id를 입력해주세요" })
  async get(@Param("id") id: Number): Promise<any> {
    const user: Object = await this.usersService.findByPk(id);
    const result = {
      user: user
    };
    return result;
  }

  @Post()
  async create(@Body() dto: UserCreateDto): Promise<any> {
    const user: Object = await this.usersService.create(dto);
    const result = {
      user: user
    };
    return result;
  }

  @Put(":id")
  @ApiQuery({ name: "id", description: "업데이트하실 id를 입력해주세요" })
  async update(
    @Param("id") id: Number,
    @Body() dto: UserCreateDto
  ): Promise<any> {
    const user: Object = await this.usersService.update(id, dto);
    const result = {
      user: user
    };
    return result;
  }

  @Delete()
  @ApiQuery({ name: "id", description: "삭제하실 id를 입력해주세요" })
  async delete(@Param("id") id: Number): Promise<any> {
    const user: Object = await this.usersService.destroy(id);
    const result = {
      user: user
    };
    return result;
  }
}
