import { BaseEntity, ObjectType as OType, EntityMetadata } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

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
