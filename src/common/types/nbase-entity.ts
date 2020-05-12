import {
  BaseEntity,
  PrimaryGeneratedColumn,
  ObjectType as OType,
  ObjectLiteral,
  OrderByCondition,
  LessThan,
  CreateDateColumn,
  UpdateDateColumn,
  SelectQueryBuilder
} from "typeorm";
import { NBaseResolveRelationResult, resolveRelations } from "./nbase-resolver";
import { NbaseListResult } from "./nbase-list-result";
const pluralize = require("pluralize");

export abstract class NbaseEntity extends BaseEntity {
  constructor(obj?: object) {
    super();
    Object.assign(this, obj);
  }

  @PrimaryGeneratedColumn()
  id: number;

  cursor?: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: number;

  static async createList<T extends NbaseEntity, U extends NbaseListResult>(
    this: OType<T>,
    resultClass: new (obj) => U,
    config: NBaseCreateListConfig,
    args
  ) {
    const { customize, argsResolver, orderByResolver } = config;

    // alias
    const entityClass = this;
    const entityAlias = entityClass.name.toLowerCase();
    const listAlias = pluralize(entityAlias);

    // query builder
    let queryBuilder = (entityClass as any).createQueryBuilder(entityAlias);

    // select, relations
    const relations: NBaseResolveRelationResult[] = resolveRelations(
      entityClass
    );
    console.log("relations", relations);
    // queryBuilder.select("*");
    relations.forEach((relation) => {
      queryBuilder.leftJoinAndSelect(relation.property, relation.alias);
    });

    // customize
    let where = {};
    if (customize) {
      where = Object.assign(where, config.customize(queryBuilder));
    }

    // where
    for (let key in argsResolver) {
      if (args[key] != undefined && argsResolver[key] != undefined) {
        where = Object.assign(where, argsResolver[key](args, queryBuilder));
      }
    }

    queryBuilder.where(where);

    // count, cursor, orderBy
    const cursorAlias = `${entityAlias}_cursor`;
    const totalCount = await queryBuilder.getCount();

    if (args.orderBy != null) {
      const { cursor, orderBy } = orderByResolver[args.orderBy];
      queryBuilder.addSelect(`(${cursor})`, cursorAlias);
      queryBuilder.orderBy(orderBy);

      if (args.after != null) {
        queryBuilder.andWhere(`(${cursor}) < :after`, {
          after: args.after
        });
      }
    }

    // take, raw, assign each of cursors

    queryBuilder.take(args.take + 1);
    if (args.offset) {
      queryBuilder.skip(args.offset * args.take);
    }
    let { raw, entities } = await queryBuilder.getRawAndEntities();

    entities = entities.map((entity) => {
      const rawRow = raw.find(
        (rawRow) => rawRow[entityAlias + "_id"] == entity.id
      );
      entity.cursor = rawRow[cursorAlias];
      return entity;
    });

    // result
    return new resultClass({
      [listAlias]: entities.slice(0, args.take),
      totalCount,
      hasNext: entities.length == args.take + 1
    });
  }
}

export interface NBaseCreateListConfig {
  customize?: (builder) => void;
  /**
   *  Arguments Resolver
   */
  argsResolver?: {
    [argsKey: string]: (args, builder?) => ObjectLiteral;
  };
  /**
   *  OrderBy Filter Resolver
   */
  orderByResolver: {
    [orderByKey: string]: { cursor: string; orderBy: OrderByCondition };
  };
}
