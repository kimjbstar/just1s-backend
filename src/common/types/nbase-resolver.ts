import { NbaseEntity } from "./nbase-entity";
import { BaseEntity, ObjectType as OType, EntityMetadata } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { User } from "@src/entities/user.entity";

const changeCase = require("change-case");
const pluralize = require("pluralize");

export interface NBaseResolveRelationResult {
  property: string;
  alias: string;
}

export function resolveRelations(entity: any): NBaseResolveRelationResult[] {
  const metadata: EntityMetadata = (entity as any).getRepository().metadata;
  const columns: ColumnMetadata[] = metadata.columns;
  let result: NBaseResolveRelationResult[] = [];
  columns.forEach((column) => {
    if (column.referencedColumn !== undefined) {
      let subResult = resolveRelations(
        column.referencedColumn.entityMetadata.target
      );
      result = result.concat(subResult);

      result.push({
        property: metadata.tableName + "." + column.propertyName,
        alias: column.referencedColumn.entityMetadata.tableName
      });
    }
  });

  return result;
}

// export function resolveEntity(entity: NbaseEntityCtor): any {

//   const metadata = (entity as any)
//     .getRepository()
//     .manager.connection.getMetadata(entity);
//   const ownFields = metadata.ownColumns
//     .filter((column) => column.relationMetadata == null)
//     .map((column) => column.propertyName);
//   const propertyKeys = Object.keys(metadata.propertiesMap);

//   const entityAlias = entity.name.toString().toLowerCase();
//   const listName = pluralize(entityAlias);
//   // let _fields = graphqlFields(info, {}, { processArguments: true });
//   // _fields = _fields[listName] != undefined ? _fields[listName] : _fields;

//   // const fields: string[] = Object.keys(_fields);
//   const fields = ownFields;

//   return fields.reduce(
//     (result, field) => {
//       if (ownFields.indexOf(field) >= 0) {
//         result.select.push(field);
//       } else if (
//         propertyKeys.indexOf(field) >= 0 &&
//         typeof _fields[field] == "object"
//       ) {
//         const subRelations = getDepthRelationsRecursively(
//           entityAlias,
//           _fields,
//           field
//         );
//         result.relations = result.relations.concat(subRelations);
//       } else if (field.indexOf("grouped") == 0) {
//         result.relations.push([
//           entityAlias + "." + field.replace("grouped", "").toLowerCase(),
//           changeCase.camelCase(field)
//         ]);
//       }
//       return result;
//     },
//     {
//       list: [],
//       select: [],
//       relations: []
//     }
//   );
// }

// function getDepthRelationsRecursively(entityAlias, fields, field, depth = 1) {
//   const keys = Object.keys(fields[field]);

//   let relations = [];
//   if (keys.length != 0) {
//     if (depth == 1) {
//       relations.push([entityAlias + "." + field, changeCase.camelCase(field)]);
//     } else {
//       relations.push([
//         entityAlias + "." + field,
//         changeCase.camelCase(entityAlias + "." + field)
//       ]);
//     }

//     keys.forEach((key) => {
//       const subRelations = getDepthRelationsRecursively(
//         depth == 1 ? field : entityAlias + "." + field,
//         fields[field],
//         key,
//         depth + 1
//       );
//       relations = relations.concat(subRelations);
//     });
//   }

//   return relations;
// }
