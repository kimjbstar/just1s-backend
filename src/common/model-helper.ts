import { Op, Sequelize } from "sequelize";
import { FindOptions, FindAttributeOptions } from "sequelize/types";
import { Model } from "sequelize-typescript";

interface IModelConstructor<T> {
  new (...args: any[]): T;
}

export class ModelHelper {
  static setDeep = (
    obj: any,
    fields: string[],
    value: any,
    isArray = false
  ) => {
    if (fields.length < 1) {
      return false;
    }
    const field = fields[0];
    if (obj[field] === undefined) {
      obj[field] = fields.length == 1 ? [] : {};
    }
    if (fields.length == 1) {
      if (isArray) {
        obj[field].push(value);
      } else {
        obj[field] = value;
      }
      return obj;
    }
    obj[fields[0]] = ModelHelper.setDeep(
      obj[fields[0]],
      fields.splice(1),
      value
    );
    return obj;
  };

  // Promise<Array<T>>
  static findWithOptions<T>(
    member: IModelConstructor<T>,
    resolvers: any,
    params: any
  ): any {
    // TODO : 여기서 param 또는 resolver 받아서 findOption 만들도록 해야 함
    const {
      _include,
      argResolvers,
      orderResolvers,
      _limit = 24,
      _offset = 0
    } = resolvers;

    let _options = {
      attributes: {
        include: []
      },
      include: [],
      where: {},
      order: [],
      limit: 24,
      offset: 0
    };

    for (let key in argResolvers) {
      if (params[key] !== undefined && argResolvers[key] !== undefined) {
        const { type = "where", names = [key], operator = "eq" } = argResolvers[
          key
        ];
        _options[type] = ModelHelper.setDeep(
          _options[type],
          names.concat(Op[operator]),
          params[key]
        );
      }
    }
    // console.log(_options.where);
    // [Sequelize.fn("COUNT", Sequelize.col('`OfficeLocations->Ratings`.`id`')), "RatingsCount"]

    if (
      params["order"] !== undefined &&
      orderResolvers[params["order"]] !== undefined
    ) {
      const { cursor, orderBy } = orderResolvers[params["order"]];
      _options.attributes = ModelHelper.setDeep(
        _options.attributes,
        ["include"],
        [Sequelize.literal(cursor), "cursor"]
      );
      console.log(_options.attributes);
      _options.order = orderBy;
    }

    // Op.eq 다음 // obj[field] = value;들어감
    // console.dir(Object.values(_options.include), { depth: 3 });
    const findOptions: FindOptions = {
      where: _options.where,
      attributes: _options.attributes,
      include: Object.values(_options.include),
      order: _options.order,
      offset: _options.offset,
      limit: _options.limit
    };
    console.dir(findOptions, { depth: 4 });
    // console.dir(findOptions.attributes, { depth: 3 });
    return (member as any).findAll(findOptions);
  }
}

// export class OnsalecarsResolver extends F9BaseResolver {
//   @Query(returns => OnsalecarListResult)
//   async onsalecarList(
//     @Args() args: OnsalecarListArgs,
//     @Info() info,
//     @CurrentApp() app,
//     @CurrentUser() user
//   ): Promise<OnsalecarListResult> {
//     const createListConfig: F9CreateListConfig = {
//       // customize: builder => {
//       //   return builder.innerJoin(
//       //     "onsalecar_apps_app",
//       //     "pa",
//       //     `pa.onsalecarId = onsalecar.id and pa.appId = ${app.id}`
//       //   );
//       // },
//       argsResolver: {
//         finalcialStatus: args => {
//           return {
//             finalcialStatus: Equal(args.finalcialStatus)
//           };
//         },
//         hadAccident: args => {
//           return {
//             hadAccident: Equal(args.hadAccident)
//           };
//         },
//         type: args => {
//           return {
//             type: Equal(args.type)
//           };
//         },
//         status: args => {
//           return {
//             status: Equal(args.status)
//           };
//         }
//       },
//       orderByResolver: {
//         [OnsalecarListOrderBy.ID__DESC]: {
//           cursor: "onsalecar.id",
//           orderBy: {
//             "onsalecar.id": "DESC"
//           }
//         },
//         [OnsalecarListOrderBy.PRICE__DESC]: {
//           cursor: "onsalecar.price + onsalecar.id/10000",
//           orderBy: {
//             "onsalecar.price": "DESC",
//             "onsalecar.id": "DESC"
//           }
//         },
//         [OnsalecarListOrderBy.PRICE__ASC]: {
//           cursor: "onsalecar.price + onsalecar.id/10000",
//           orderBy: {
//             "onsalecar.price": "ASC",
//             "onsalecar.id": "ASC"
//           }
//         }
//       }
//     };
//     return Onsalecar.createList(
//       OnsalecarListResult,
//       createListConfig,
//       info,
//       args
//     );
//   }

// import {
//   BaseEntity,
//   PrimaryGeneratedColumn,
//   ObjectType as OType,
//   ObjectLiteral,
//   OrderByCondition,
//   LessThan,
// } from 'typeorm';
// import { Field, Float, Int, ObjectType } from 'type-graphql';

// import { resolveGqlInfo } from '@src/f9-base/resolvers/resolve-gql-info';
// import { F9BaseListResult } from '@src/f9-base/types/f9-base-list-result';
// const pluralize = require('pluralize');

// @ObjectType()
// export abstract class F9BaseEntity extends BaseEntity {
//   constructor(obj?: object) {
//     super();
//     Object.assign(this, obj);
//   }

//   @PrimaryGeneratedColumn()
//   @Field(type => Int)
//   id: number;

//   @Field(type => Float)
//   cursor?: number;

//   static findByIdWithInfo<T extends F9BaseEntity>(
//     this: OType<T>,
//     entityId: number,
//     info,
//   ) {
//     return (this as any).findOneWithInfo(
//       {
//         id: entityId,
//       },
//       info,
//     );
//   }

//   static findOneWithInfo<T extends F9BaseEntity>(
//     this: OType<T>,
//     where,
//     info,
//   ): Promise<T> {
//     const { select, relations } = resolveGqlInfo(info, this);
//     return (this as any).getRepository().findOne({
//       where,
//       select: select,
//       relations: relations.map(([property, alias]) =>
//         property.replace(this.name.toString().toLowerCase() + '.', ''),
//       ),
//     });
//   }

//   static async createList<T extends F9BaseEntity, U extends F9BaseListResult>(
//     this: OType<T>,
//     resultClass: new (obj) => U,
//     config: F9CreateListConfig,
//     info,
//     args,
//   ) {
//     const { customize, argsResolver, orderByResolver } = config;

//     // alias
//     const entityClass = this;
//     const entityAlias = entityClass.name.toLowerCase();
//     const listAlias = pluralize(entityAlias);

//     // query builder
//     let queryBuilder = (entityClass as any).createQueryBuilder(entityAlias);

//     // select, relations
//     const { select, relations } = resolveGqlInfo(info, entityClass);
//     queryBuilder.select(select.map(field => `${entityAlias}.${field}`));
//     relations.forEach(([property, alias]) => {
//       queryBuilder.leftJoinAndSelect(property, alias);
//     });

//     // customize
//     let where = {};
//     if (customize) {
//       where = Object.assign(where, config.customize(queryBuilder));
//     }

//     // where
//     for (let key in argsResolver) {
//       if (args[key] != undefined && argsResolver[key] != undefined) {
//         where = Object.assign(where, argsResolver[key](args));
//       }
//     }
//     queryBuilder.where(where);

//     // count, cursor, orderBy
//     const cursorAlias = `${entityAlias}_cursor`;
//     const totalCount = await queryBuilder.getCount();

//     if (args.orderBy != null) {
//       const { cursor, orderBy } = orderByResolver[args.orderBy];
//       queryBuilder.addSelect(`(${cursor})`, cursorAlias);
//       queryBuilder.orderBy(orderBy);

//       if (args.after != null) {
//         queryBuilder.andWhere(`(${cursor}) < :after`, {
//           after: args.after,
//         });
//       }
//     }

//     // take, raw, assign each of cursors
//     queryBuilder.take(args.take + 1);
//     if (args.offset) {
//       console.log(args.offset);
//       queryBuilder.skip(args.offset * args.take);
//     }
//     let { raw, entities } = await queryBuilder.getRawAndEntities();
//     entities = entities.map(entity => {
//       const rawRow = raw.find(
//         rawRow => rawRow[entityAlias + '_id'] == entity.id,
//       );
//       entity.cursor = rawRow[cursorAlias];
//       return entity;
//     });

//     // result
//     return new resultClass({
//       [listAlias]: entities.slice(0, args.take),
//       totalCount,
//       hasNext: entities.length == args.take + 1,
//     });
//   }
// }

// export interface F9CreateListConfig {
//   customize?: (builder) => void;
//   /**
//    *  Arguments Resolver
//    */
//   argsResolver?: {
//     [argsKey: string]: (args) => ObjectLiteral;
//   };
//   /**
//    *  OrderBy Filter Resolver
//    */
//   orderByResolver: {
//     [orderByKey: string]: { cursor: string; orderBy: OrderByCondition };
//   };
// }
