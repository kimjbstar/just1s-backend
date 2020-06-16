import { BaseEntity, ObjectType as OType, EntityMetadata } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

export interface NBaseResolveRelationResult {
  property: string;
  alias: string;
}

export function resolveRelations(
  entity: any,
  prefix?: string
): NBaseResolveRelationResult[] {
  const metadata: EntityMetadata = (entity as any).getRepository().metadata;
  const columns: ColumnMetadata[] = metadata.columns;
  let result: NBaseResolveRelationResult[] = [];
  columns.forEach((column) => {
    if (column.referencedColumn !== undefined) {
      let property = metadata.tableName + "." + column.propertyName;
      property = prefix ? `${prefix}_${property}` : property;
      result.push({
        property: property,
        alias:
          metadata.tableName +
          "_" +
          column.referencedColumn.entityMetadata.tableName
      });
      let subResult = resolveRelations(
        column.referencedColumn.entityMetadata.target,
        metadata.tableName
      );
      result = result.concat(subResult);
    }
  });

  return result;
}
