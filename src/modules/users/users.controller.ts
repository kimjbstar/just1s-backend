import {
  UserStatus,
  UserOrderbys,
  UserSNSType
} from "@src/modules/users/users.enum";
import { ApiProperty, ApiQuery } from "@nestjs/swagger";
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
import { IsNotEmpty, IsEnum, IsOptional, IsEmail } from "class-validator";

export class UserListQuery {
  @IsOptional()
  @IsEnum(UserSNSType)
  @ApiProperty({
    description: "UserSNSType(를) 입력해주세요 !",
    enum: Object.values(UserSNSType),
    default: UserSNSType.EMAIL
  })
  snsType: UserSNSType;

  @IsOptional()
  @IsEnum(UserStatus)
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
  @IsNotEmpty()
  @IsEnum(UserSNSType)
  @ApiProperty({
    description: "UserSNSType(를) 입력해주세요 !",
    enum: Object.values(UserSNSType)
  })
  snsType: UserSNSType;

  @IsNotEmpty()
  @IsEnum(UserStatus)
  @ApiProperty({
    description: "status을(를) 입력해주세요 !",
    enum: Object.values(UserStatus)
  })
  status: UserStatus;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "email을(를) 입력해주세요 !"
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "stringId을(를) 입력해주세요 !"
  })
  stringId: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "pw을(를) 입력해주세요 !"
  })
  pw: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "imgUrl을(를) 입력해주세요 !"
  })
  imgUrl: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "nickname을(를) 입력해주세요 !"
  })
  nickname: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "name을(를) 입력해주세요 !"
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "phoneNumber을(를) 입력해주세요 !"
  })
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "desc을(를) 입력해주세요 !"
  })
  desc: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "blockedUntil을(를) 입력해주세요 !"
  })
  blockedUntil: Date;
  @IsNotEmpty()
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
      users: users.map((user) => {
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

  @Delete()
  @ApiQuery({ name: "id", description: "삭제하실 id를 입력해주세요" })
  async delete(@Param("id", ParseIntPipe) id: Number): Promise<any> {
    const user: Object = await this.usersService.destroy(id);
    const result = {
      user: classToPlain(user)
    };
    return result;
  }
}
