import {
  Sequelize,
  DataType as SequelizeTypescriptDataType,
  SequelizeOptions
} from "sequelize-typescript";
import {
  ModelCtor,
  Model,
  ModelAttributeColumnOptions,
  DataType,
  IndexesOptions,
  QueryInterface
} from "sequelize/types";

export default function reverseSequelizeColType(
  sequelize,
  col: ModelAttributeColumnOptions,
  prefix = "Sequelize."
) {
  const attrObj: DataType = col.type;
  // const options = col.type["options"] ? col.type["options"] : {};

  // Virtual data type, we must to skip it
  if (attrObj instanceof SequelizeTypescriptDataType.VIRTUAL) {
    return `${prefix}VIRTUAL`;
  }

  // is it used ??
  if (attrObj instanceof SequelizeTypescriptDataType.CHAR) {
    if (!attrObj.options.length) {
      return `${prefix}CHAR`;
    }
    const postfix = attrObj.options.binary ? ".BINARY" : "";
    return `${prefix}CHAR${postfix}`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.STRING) {
    if (!attrObj.options.length) {
      return `${prefix}STRING`;
    }
    const postfix = attrObj.options.binary ? ".BINARY" : "";
    return `${prefix}STRING${postfix}`;
  }

  if (attrObj instanceof SequelizeTypescriptDataType.TEXT) {
    if (!attrObj.options.length) {
      return `${prefix}TEXT`;
    }
    const postfix = `(${attrObj.options.length.toLowerCase()})`;
    return `${prefix}TEXT(${postfix})`;
  }

  // INTEGER, BIGINT, FLOAT, REAL, DOUBLE, DECIMAL?
  // TINYINT, SMALLINT, MEDIUMINT, INTEGER, BIGINT, FLOAT, REAL, DOUBLE, DECIMAL
  if (attrObj instanceof SequelizeTypescriptDataType.NUMBER) {
    let ret = attrObj.key;
    if (attrObj.options.length) {
      ret += `(${attrObj.options.length}`;
      if (attrObj.options.decimals) {
        ret += `, ${attrObj.options.decimals}`;
      }
      ret += ")";
    }

    const arrayRet = [ret];

    if (attrObj.options.zerofill) {
      arrayRet.push("ZEROFILL");
    }

    if (attrObj.options.unsigned) {
      arrayRet.push("UNSIGNED");
    }

    return prefix + arrayRet.join(".");
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

  // ARRAY ( PostgreSQL only )
  // GEOMETRY
  //// DataTypes.GEOMETRY('POINT')
  //// DataTypes.GEOMETRY('POINT', 4326)
  // GEOGRAPHY
  // TODO : RANGE ( PostgreSQL only )

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
    col.type["options"] !== undefined &&
    typeof col.type["options"].toString === "function"
  ) {
    seqType = col.type["options"].toString(sequelize);
  }

  if (typeof col.type.toString === "function") {
    seqType = col.type.toString(sequelize);
  }

  return seqType;
}
