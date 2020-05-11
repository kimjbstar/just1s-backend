import {
  getConnectionManager,
  getConnection,
  Connection,
  createConnection,
  Column,
  Entity,
  Equal
} from "typeorm";
import "reflect-metadata";
import { Deck } from "./entities/deck.entity";
import { DeckMusic } from "./entities/deckMusic.entity";
import { Music } from "./entities/music.entity";
import * as path from "path";
import { DeckHashtag } from "./entities/deckHashtag.entity";
import { User } from "@src/entities/user.entity";
// import { User } from "./entities/user.entity";

import { NbaseEntity, F9CreateListConfig } from "./common/types/nbase-entity";
import { UserListOrderBys, UserStatus } from "@src/modules/users/users.enum";
import { NBaseListArgs } from "./common/types/nbase-list-args";
import { UserListResult } from "./modules/users/args/user-list.result";

const createListConfig: F9CreateListConfig = {
  // customize: builder => {
  //   return builder.innerJoin(
  //     'product_apps_app',
  //     'pa',
  //     `pa.productId = product.id and pa.appId = ${app.id}`,
  //   );
  // },
  argsResolver: {
    status: (args) => {
      return {
        status: Equal(args.status)
      };
    }
    // brandId: args => {
    //   return {
    //     brand: {
    //       id: args.brandId,
    //     },
    //   };
    // },
    // categoryId: args => {
    //   return {
    //     category: {
    //       id: In(childrenIds),
    //     },
    //   };
    // },
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
    host: process.env.TYPEORM_HOST,
    port: 3306,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [entityPath],
    logging: true
  });

  const conn = await beforeConnection.connect();

  const args = new NBaseListArgs({
    status: UserStatus.NORMAL,
    take: 10,
    orderBy: UserListOrderBys.ID__DESC
  });
  const a = await User.createList(UserListResult, createListConfig, args);
  console.log(a);
  process.exit(0);
};
bootstrap();
