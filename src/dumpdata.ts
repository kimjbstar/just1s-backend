import * as path from "path";
import * as fs from "fs";
import { NbaseEntity } from "./common/types/nbase-entity";
import { getConnectionManager, Connection } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { Deck } from "./entities/deck.entity";
import { DeckMusic } from "./entities/deckMusic.entity";

export type TypeOrmEntityCtor = new () => NbaseEntity;

export type FixtureEntityInspectResult = {
  modelClass: TypeOrmEntityCtor;
  ids: number[];
};

const bootstrap = async () => {
  const fixtureDir = path.join(process.cwd(), "./tests/fixtures");
  const entityPath = path.join(__dirname, "entities/**{.ts,.js}");

  const connectionManager = getConnectionManager();
  const beforeConnection = connectionManager.create({
    type: "mysql",
    host: process.env.TYPEORM_HOST,
    port: 3306,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [entityPath]
  });

  const conn: Connection = await beforeConnection.connect();
  await conn.runMigrations();

  const resultEntityWithPks = await getModelAndPksTypeORM(Deck, [15]);
  dump(conn, fixtureDir, resultEntityWithPks);

  const resultEntityWithPks2: FixtureEntityInspectResult[] = await getModelAndPksTypeORM(
    DeckMusic,
    [5, 6, 7, 8]
  );
  dump(conn, fixtureDir, resultEntityWithPks2);
};
// subtable도 가능하게

const dump = async (conn, fixtureDir, resultEntityWithPks) => {
  resultEntityWithPks.forEach(async (resultEntityWithPk) => {
    const tableName = (resultEntityWithPk.modelClass as any).getRepository()
      .metadata.tableName;

    if (resultEntityWithPks.length < 1) {
      return;
    }
    const sql = `SELECT * FROM ${tableName} WHERE ID IN (${resultEntityWithPk.ids.join(
      ","
    )})`;
    const rows = await conn.createQueryRunner().query(sql);

    const filePath = path.join(fixtureDir, tableName);
    await fs.writeFileSync(filePath, JSON.stringify(rows));
    console.log(`saved ${rows.length} fixture rows to ${filePath}.`);
  });
};

const getModelAndPksTypeORM = async (
  modelCtor: TypeOrmEntityCtor,
  pks: number[]
): Promise<FixtureEntityInspectResult[]> => {
  // User.findByIds([1, 2], {});

  const columns: ColumnMetadata[] = (modelCtor as any).getRepository().metadata
    .columns;
  let fkInfos = [];
  columns.forEach((column) => {
    if (column.referencedColumn !== undefined) {
      fkInfos.push({
        columnName: column.propertyName,
        tableName: column.referencedColumn.entityMetadata.tableName,
        target: column.referencedColumn.entityMetadata.target
      });
    }
  });

  const relations = fkInfos.map((fkInfo) => fkInfo.tableName);
  const rows: NbaseEntity[] = await (modelCtor as any).findByIds(pks, {
    relations: relations
  });

  let result: FixtureEntityInspectResult[] = [
    {
      modelClass: modelCtor,
      ids: pks
    }
  ];
  fkInfos.forEach((fkInfo) => {
    const pks = rows.reduce((result, row) => {
      const pk = row[fkInfo.columnName].id;
      if (result.indexOf(pk) < 0) {
        result.push(pk);
      }
      return result;
    }, []);
    result.push({
      modelClass: fkInfo.target,
      ids: pks
    });
  });
  return result;
};

bootstrap();
