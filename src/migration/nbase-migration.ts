import { Sequelize, Model } from "sequelize-typescript";
import { Category } from "../models/category.model";

import * as inflection from "inflection";

export interface MigrationConfigSubtablePolicy {
  relationField: string;
  subFields: string[];
  build: Function;
  determine?: Function;
}

export interface MigrationConfig<T> {
  srcConnection: Sequelize;
  dstConnection: Sequelize;
  entityClass: new (obj: object) => T;
  tableName: string;
  srcQuery: string;
  renamePolicy?: {
    [index: string]: string;
  };
  transformPolicy?: {
    [index: string]: Function;
  };
  newFieldPolicy?: {
    [index: string]: Function;
  };
  subtablePolicies?: MigrationConfigSubtablePolicy[];
  sequential?: boolean;
}

interface ISequelizeDescribeResult {
  fieldName: string;
  type: string;
  allowNull: boolean;
  defaultValue: any;
  autoIncrement: true;
  comment: string;
}

export class NbaseMigration<T extends Model> {
  private readonly perQuery: number = 10000;

  constructor(private config: MigrationConfig<T>) {
    if (this.config.renamePolicy == null) {
      this.config.renamePolicy = {};
    }
    if (this.config.transformPolicy == null) {
      this.config.transformPolicy = {};
    }
  }

  async run(): Promise<void> {
    const { srcConnection, tableName, srcQuery } = this.config;
    console.log(`MIGRATION from ${tableName}`);

    for (let page = 1; page < 9999; page++) {
      const offset = this.perQuery * (page - 1);
      const query = `${srcQuery} LIMIT ${offset}, ${this.perQuery}`;
      const srcRows = await srcConnection
        .query(query, {
          raw: true,
          type: "SELECT"
        })
        .catch(err => {
          console.log(err);
        });
      if (typeof srcRows == "undefined") {
        break;
      }

      await this.runWithSrcRows(srcRows);
      if (srcRows.length != this.perQuery) {
        break;
      }
    }
    console.log("");
  }

  private async runWithSrcRows(srcRows): Promise<void> {
    const {
      dstConnection,
      entityClass,
      renamePolicy,
      transformPolicy,
      subtablePolicies,
      sequential,
      newFieldPolicy
    } = this.config;

    const modelClass: any = this.config.entityClass;

    const describeResult = await modelClass.describe();
    const columns = Object.keys(describeResult).reduce((result, key) => {
      const row: ISequelizeDescribeResult = {
        fieldName: key,
        type: describeResult[key].type,
        allowNull: describeResult[key].allowNull,
        defaultValue: describeResult[key].defaultValue,
        autoIncrement: describeResult[key].autoIncrement,
        comment: describeResult[key].comment
      };
      result.push(row);
      return result;
    }, []);

    const keysToRename = Object.keys(renamePolicy);

    const srcKeys = Object.keys(srcRows[0]);
    const dstKeys = srcKeys.map(key => {
      const dstKey =
        keysToRename.indexOf(key) < 0
          ? inflection.camelize(key, true)
          : renamePolicy[key];

      const column: ISequelizeDescribeResult = columns.find(
        _column => _column.fieldName == dstKey
      );
      if (!column || transformPolicy[key]) {
        // NOTHING TO DO
      } else if (
        column.type == "DATETIME" ||
        column.type.toString().indexOf("function Date") >= 0
      ) {
        transformPolicy[key] = value =>
          value == "" && key != "created_at" ? null : new Date(value * 1000);
      } else if (column.type == "float") {
        transformPolicy[key] = value =>
          value == "" ? column.defaultValue : parseFloat(value);
      } else if (
        column.type == "int" ||
        column.type.toString().indexOf("function Number") >= 0
      ) {
        transformPolicy[key] = value =>
          value == "" ? column.defaultValue : parseInt(value);
      }

      return {
        srcKey: key,
        dstKey: dstKey,
        dstType: column ? column.type : null
      };
    });

    // const progressBar = new CliProgress.Bar(
    //   {},
    //   CliProgress.Presets.shades_grey
    // );

    // const repo = dstConnection.getRepository(entityClass);

    const rows = srcRows.map(function(srcRow) {
      let _row: any = dstKeys.reduce((result, pair) => {
        const value = transformPolicy[pair.srcKey]
          ? transformPolicy[pair.srcKey](srcRow[pair.srcKey])
          : srcRow[pair.srcKey];

        result[pair.dstKey] = value;
        return result;
      }, {});

      if (newFieldPolicy != null) {
        for (const key in newFieldPolicy) {
          _row[key] = newFieldPolicy[key](_row);
        }
      }

      if (subtablePolicies != null && subtablePolicies.length > 0) {
        subtablePolicies.forEach(policy => {
          if (policy.determine && policy.determine(_row) === false) {
            return;
          }
          let obj: any = policy.subFields.reduce((result, field) => {
            result[field] = _row[field];
            return result;
          }, {});
          obj.id = _row.id;
          _row[policy.relationField] = policy.build(obj);
        });
      }

      return _row;
    });

    // console.log(rows);
    await modelClass.bulkCreate(rows, {
      // updateOnDuplicate: ["fuelType"]
      ignoreDuplicates: true
    });
    // console.log(a);

    // progressBar.start(srcRows.length, 0);

    // if (sequential === true) {
    //   for (let i in rows) {
    //     const row = rows[i];
    //     await repo
    //       .save(rows[i])
    //       .then(() => {
    //         progressBar.increment(1);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   }
    //   progressBar.stop();
    // } else {
    //   const promises = rows.map(row => {
    //     return repo.save(row).then(() => {
    //       progressBar.increment(1);
    //     });
    //   });

    //   await Promise.all(promises)
    //     .then(() => {
    //       progressBar.stop();
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  }
}

// export async function plainMigration(
//   perQuery: number = 5000,
//   srcConnection: Sequelize,
//   dstConnection: Sequelize,
//   srcQuery: string,
//   dstTable: string,
//   transform: Function
// ): Promise<void> {
//   const srcQueryRunner = srcConnection.createQueryRunner();
//   const dstQueryBuilder = dstConnection.createQueryBuilder();

//   for (let page = 1; page < 9999; page++) {
//     const offset = perQuery * (page - 1);
//     const query = `${srcQuery} LIMIT ${offset}, ${perQuery}`;
//     const srcRows = await srcQueryRunner.query(query).catch(err => {
//       console.log(err);
//     });

//     await _runPlainMigration(dstQueryBuilder, dstTable, transform, srcRows);
//     if (srcRows.length != perQuery) {
//       break;
//     }
//   }
// }

// async function _runPlainMigration(
//   dstQueryBuilder,
//   dstTable,
//   transform,
//   srcRows
// ): Promise<void> {
//   const values = srcRows.map(transform);
//   await dstQueryBuilder
//     .insert()
//     .into(dstTable)
//     .values(values)
//     .execute()
//     .catch(err => {
//       console.log(err);
//     });
// }
