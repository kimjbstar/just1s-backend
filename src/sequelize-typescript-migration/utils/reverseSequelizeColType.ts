import { DataType as SequelizeTypescriptDataType } from "sequelize-typescript";
import { DataType } from "sequelize/types";
import { Options } from "@nestjs/common";

export default function reverseSequelizeColType(
  sequelize,
  type: DataType,
  prefix = "Sequelize."
) {
  const attrObj: DataType = type;

  if (attrObj instanceof SequelizeTypescriptDataType.VIRTUAL) {
    return `${prefix}VIRTUAL`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.CHAR) {
    if (!attrObj.options) {
      return `${prefix}CHAR`;
    }
    const postfix = attrObj.options.binary ? ".BINARY" : "";
    return `${prefix}CHAR${postfix}`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.STRING) {
    if (attrObj.options === undefined) {
      return `${prefix}STRING`;
    }

    if (attrObj.options.binary !== undefined) {
      return `${prefix}STRING.BINARY`;
    }
    const length =
      attrObj.options.length !== undefined ? `(${attrObj.options.length})` : "";
    return `${prefix}STRING${length}`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.TEXT) {
    if (!attrObj.options.length) {
      return `${prefix}TEXT`;
    }
    const postfix = `('${attrObj.options.length.toLowerCase()}')`;
    return `${prefix}TEXT(${postfix})`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.DECIMAL) {
    const params = [];

    if (attrObj.options.precision) {
      params.push(attrObj.options.precision);
    }
    if (attrObj.options.scale) {
      params.push(attrObj.options.scale);
    }
    const postfix = params.length > 0 ? `(${params.join(",")})` : "";
    return `${prefix}DECIMAL${postfix}`;
  }

  // TINYINT, SMALLINT, MEDIUMINT, INTEGER, BIGINT
  if (attrObj instanceof SequelizeTypescriptDataType.NUMBER) {
    const params = [];

    if (attrObj.options.length) {
      params.push(attrObj.options.length);
    }
    if (attrObj.options.decimals) {
      params.push(attrObj.options.decimals);
    }
    let postfix = params.length > 0 ? `(${params.join(",")})` : "";

    if (attrObj.options.zerofill) {
      postfix += ".ZEROFILL";
    }

    if (attrObj.options.unsigned) {
      postfix += ".UNSIGNED";
    }

    return `${prefix}${attrObj.key}${postfix}`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.DATE) {
    const length = attrObj.options.length ? `(${attrObj.options.length})` : "";
    return `${prefix}DATE${length}`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.DATEONLY) {
    return `${prefix}DATEONLY`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.BLOB) {
    const postfix = `(${attrObj.options.length.toLowerCase()})`;
    return `${prefix}BLOB(${postfix})`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.ENUM) {
    return `${prefix}ENUM('${attrObj.options.values.join("', '")}')`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.GEOMETRY) {
    if (attrObj.options.type == undefined) {
      return `${prefix}GEOMETRY`;
    }
    const type = attrObj.options.type.toUpperCase();
    const srid = attrObj.options.srid;
    const postfixItems = [`'${type}'`];
    if (srid !== undefined) {
      postfixItems.push(attrObj.options.srid.toString());
    }
    return `${prefix}GEOMETRY(${postfixItems.join(",")})`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.GEOGRAPHY) {
    if (attrObj.options.type == undefined) {
      return `${prefix}GEOGRAPHY`;
    }
    const type = attrObj.options.type.toUpperCase();
    const srid = attrObj.options.srid;
    const postfixItems = [`'${type}'`];
    if (srid !== undefined) {
      postfixItems.push(attrObj.options.srid.toString());
    }
    return `${prefix}GEOGRAPHY(${postfixItems.join(",")})`;
  }

  // ARRAY ( PostgreSQL only )
  if (attrObj instanceof SequelizeTypescriptDataType.ARRAY) {
    const type: DataType = attrObj.options.type;
    const innerType = reverseSequelizeColType(sequelize, type);
    return `${prefix}ARRAY(${innerType})`;
  }

  // RANGE ( PostgreSQL only )
  if (attrObj instanceof SequelizeTypescriptDataType.RANGE) {
    const type: DataType = attrObj.options.subtype;
    console.log(type);
    const innerType = reverseSequelizeColType(sequelize, type);
    return `${prefix}RANGE(${innerType})`;
  }

  let seqType;
  [
    "BOOLEAN",
    "TIME",
    "HSTORE",
    "JSON",
    "JSONB",
    "NOW",
    "UUID",
    "UUIDV1",
    "UUIDV4",
    "CIDR",
    "INET",
    "MACADDR",
    "CITEXT"
  ].forEach(typeName => {
    if (attrObj.constructor.name === typeName) {
      seqType = `${prefix}${typeName}`;
    }
  });
  if (seqType) {
    return seqType;
  }

  // handle function
  if (
    type["options"] !== undefined &&
    typeof type["options"].toString === "function"
  ) {
    seqType = type["options"].toString(sequelize);
  }

  if (typeof type.toString === "function") {
    seqType = type.toString(sequelize);
  }

  return seqType;
}
