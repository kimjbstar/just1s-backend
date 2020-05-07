import * as fs from "fs";
import * as path from "path";
import { getConnectionManager, Connection } from "typeorm";
import { User } from "@src/entities/user.entity";
import { Music } from "@src/entities/music.entity";
import { Deck } from "@src/entities/deck.entity";
import { DeckMusic } from "@src/entities/deckMusic.entity";

export const importAndGetConn = async () => {
  const entityPath = path.join(__dirname, "../src/entities/**{.ts,.js}");
  const connectionManager = getConnectionManager();
  const beforeConnection = connectionManager.create({
    type: "sqlite",
    database: process.env.TYPEORM_DATABASE + "_test.db",
    entities: [entityPath]
  });

  const conn = await beforeConnection.connect();
  await conn.synchronize(true);

  // bulkCreate
  const fixtureDir = path.join(process.cwd(), "/tests/fixtures");
  const models = [User, Music, DeckMusic, Deck];
  for (let entityCtor of models) {
    const fixtureJSON = await fs.readFileSync(
      path.join(
        fixtureDir,
        (entityCtor as any).getRepository().metadata.tableName
      )
    );
    const rows = JSON.parse(fixtureJSON.toString());
    await conn
      .createQueryBuilder()
      .insert()
      .into(entityCtor)
      .values(rows)
      .execute();
  }
  return conn;
};
