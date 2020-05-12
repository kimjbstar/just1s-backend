import {
  UserStatus,
  UserListOrderBys,
  UserSNSType
} from "@src/modules/users/users.enum";
import { ApiProperty, ApiQuery, ApiTags } from "@nestjs/swagger";
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
  // customize: builder => {
  //   return builder.innerJoin(
  //     'product_apps_app',
  //     'pa',
  //     `pa.productId = product.id and pa.appId = ${app.id}`,
  //   );
  // },
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
  async find(@Query() args: UserListArgs): Promise<any> {
    const listResult: UserListResult = await User.createList(
      UserListResult,
      createUserListConfig,
      args
    );

    const result = {
      totalCount: listResult.totalCount,
      hasNext: listResult.hasNext,
      users: listResult.users.map((user) => {
        return classToPlain(user);
      })
    };
    return result;
  }

  @Get(":id")
  @ApiQuery({ name: "id", description: "조회하실 id를 입력해주세요" })
  async get(@Param("id", ParseIntPipe) id: Number): Promise<any> {
    const user: Object = await this.usersService.findByPk(id);
    const result = {
      user: classToPlain(user)
    };
    return result;
  }

  @Post()
  async create(@Body() dto: UserCreateDto): Promise<any> {
    const user: Object = await this.usersService.create(dto);
    const result = {
      user: classToPlain(user)
    };
    return result;
  }

  @Put(":id")
  @ApiQuery({ name: "id", description: "업데이트하실 id를 입력해주세요" })
  async update(
    @Param("id", ParseIntPipe) id: Number,
    @Body() dto: UserCreateDto
  ): Promise<any> {
    const user: Object = await this.usersService.update(id, dto);
    const result = {
      user: classToPlain(user)
    };
    return result;
  }

  @Delete(":id")
  @ApiQuery({ name: "id", description: "삭제하실 id를 입력해주세요" })
  async delete(@Param("id", ParseIntPipe) id: Number): Promise<any> {
    const user: Object = await this.usersService.destroy(id);
    const result = {
      user: classToPlain(user)
    };
    return result;
  }
}
