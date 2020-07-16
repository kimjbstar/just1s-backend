import {
  getConnectionManager,
  getConnection,
  Connection,
  createConnection,
  Column,
  Entity,
  Equal,
  Like
} from "typeorm";
import "reflect-metadata";
import { Deck } from "./entities/deck.entity";
import { DeckMusic } from "./entities/deckMusic.entity";
import { Music } from "./entities/music.entity";
import * as path from "path";
import { DeckHashtag } from "./entities/deckHashtag.entity";
import { User } from "@src/entities/user.entity";
// import { User } from "./entities/user.entity";

import {
  NbaseEntity,
  NBaseCreateListConfig
} from "./common/types/nbase-entity";
import { UserListOrderBys, UserStatus } from "@src/modules/users/users.enum";
import { NBaseListArgs } from "./common/types/nbase-list-args";
import { UserListResult } from "./modules/users/args/user-list.result";

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
        name: Like(args.name)
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

const bootstrap = async () => {
  const entityPath = path.join(__dirname, "entities/**{.ts,.js}");

  const connectionManager = getConnectionManager();
  const beforeConnection = connectionManager.create({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities: [entityPath],
    logging: true
  });

  const conn = await beforeConnection.connect();

  const args = new NBaseListArgs({
    status: UserStatus.NORMAL,
    take: 10,
    orderBy: UserListOrderBys.ID__DESC
  });
  const a = await User.createList(UserListResult, createUserListConfig, args);
  console.log(a);
  process.exit(0);
};
bootstrap();
