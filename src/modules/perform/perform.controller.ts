import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  ParseIntPipe
} from "@nestjs/common";
import { PerformsService } from "@src/modules/perform/perform.service";
import { ApiProperty, ApiQuery, ApiTags, ApiResponse } from "@nestjs/swagger";
import { PerformListArgs } from "./args/perform-list.args";
import { PerformListResult } from "./args/perform-list.result";
import { NBaseCreateListConfig } from "@src/common/types/nbase-entity";
import { Equal, Like } from "typeorm";
import { DeckListOrderBys } from "../decks/deck.enum";
import { Perform } from "@src/entities/perform.entity";

const createPerformListConfig: NBaseCreateListConfig = {
  argsResolver: {
    userId: (args) => {
      return {
        user: {
          id: Equal(args.userId)
        }
      };
    },
    deckId: (args) => {
      return {
        deck: {
          id: Equal(args.deckId)
        }
      };
    }
  },
  orderByResolver: {
    [DeckListOrderBys.ID__DESC]: {
      cursor: "perform.id",
      orderBy: {
        "perform.id": "DESC"
      }
    }
  }
};
@ApiTags("performs")
@Controller("performs")
export class PerformController {
  constructor(private readonly performService: PerformsService) {}

  @Get()
  @ApiResponse({
    description: "Perform의 리스트를 가져옵니다.",
    type: PerformListResult
  })
  async find(@Query() args: PerformListArgs): Promise<any> {
    return await Perform.createList(
      PerformListResult,
      createPerformListConfig,
      args
    );
  }

  @Get(":id")
  @ApiResponse({
    description: "id에 해당하는 Perform을 출력합니다.",
    type: Perform
  })
  @ApiQuery({ name: "id", description: "조회하실 id를 입력해주세요" })
  async get(@Param("id", ParseIntPipe) id: Number): Promise<any> {
    return await this.performService.findByPk(id);
  }

  @Delete(":id")
  @ApiResponse({
    description: "id에 해당하는 Perform을 삭제합니다."
  })
  @ApiQuery({ name: "id", description: "삭제하실 id를 입력해주세요" })
  async delete(@Param("id", ParseIntPipe) id: Number): Promise<any> {
    return await this.performService.destroy(id);
  }
}
