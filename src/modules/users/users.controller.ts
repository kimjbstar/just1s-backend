import {
  UserStatus,
  UserListOrderBys,
  UserSNSType
} from "@src/modules/users/users.enum";
import { ApiProperty, ApiQuery, ApiTags, ApiResponse } from "@nestjs/swagger";
import {
  Controller,
  Get,
  Req,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  ParseIntPipe
} from "@nestjs/common";
import { UsersService } from "@src/modules/users/users.service";
import { classToPlain } from "class-transformer";
import { UserListArgs } from "./args/user-list.args";
import { UserCreateDto } from "./dtos/user-create.dto";
import { User } from "@src/entities/user.entity";
import { NBaseCreateListConfig } from "@src/common/types/nbase-entity";
import { Equal, Like } from "typeorm";
import { UserListResult } from "./args/user-list.result";

const createUserListConfig: NBaseCreateListConfig = {
  argsResolver: {
    snsType: (args) => {
      return {
        snsType: Equal(args.snsType)
      };
    },
    status: (args) => {
      return {
        status: Equal(args.status)
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
    [UserListOrderBys.ID__DESC]: {
      cursor: "user.id",
      orderBy: {
        "user.id": "DESC"
      }
    }
  }
};
@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    description: "User의 리스트를 가져옵니다.",
    type: UserListResult
  })
  async find(@Query() args: UserListArgs): Promise<any> {
    return await User.createList(UserListResult, createUserListConfig, args);
  }

  @Get(":id")
  @ApiResponse({
    description: "id에 해당하는 User을 출력합니다.",
    type: User
  })
  @ApiQuery({ name: "id", description: "조회하실 id를 입력해주세요" })
  async get(@Param("id", ParseIntPipe) id: Number): Promise<any> {
    return await this.usersService.findByPk(id);
  }

  @Post()
  @ApiResponse({
    description: "dto에 해당하는 User을 생성하여 출력합니다.",
    type: User
  })
  async create(@Body() dto: UserCreateDto): Promise<any> {
    return await this.usersService.create(dto);
  }

  @Put(":id")
  @ApiResponse({
    description: "id에 해당하는 User을 dto를 통해 업데이트하여 출력합니다.",
    type: User
  })
  @ApiQuery({ name: "id", description: "업데이트하실 id를 입력해주세요." })
  async update(
    @Param("id", ParseIntPipe) id: Number,
    @Body() dto: UserCreateDto
  ): Promise<any> {
    return await this.usersService.update(id, dto);
  }

  @Delete(":id")
  @ApiResponse({
    description: "id에 해당하는 User을 삭제합니다."
  })
  @ApiQuery({ name: "id", description: "삭제하실 id를 입력해주세요" })
  async delete(@Param("id", ParseIntPipe) id: Number): Promise<any> {
    return await this.usersService.destroy(id);
  }
}
