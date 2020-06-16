import * as inflection from "inflection";

export const TEMPLATE_TYPES = [
  {
    key: "entity",
    getDirectory: (name) => `/src/entities`,
    getFileName: (name) => `${inflection.camelize(name, true)}.entity.ts`,
    sub: true
  },
  {
    key: "enum",
    getDirectory: (name) => `/src/modules/${inflection.pluralize(name)}`,
    getFileName: (name) =>
      `${inflection.underscore(inflection.singularize(name))}.enum.ts`
  },
  {
    key: "controller",
    getDirectory: (name) => `/src/modules/${inflection.pluralize(name)}`,
    getFileName: (name) => `${inflection.pluralize(name)}.controller.ts`
  },
  {
    key: "service",
    getDirectory: (name) => `/src/modules/${inflection.pluralize(name)}`,
    getFileName: (name) => `${inflection.pluralize(name)}.service.ts`
  },
  {
    key: "module",
    getDirectory: (name) => `/src/modules/${inflection.pluralize(name)}`,
    getFileName: (name) => `${inflection.pluralize(name)}.module.ts`
  },
  {
    key: "create-dto",
    getDirectory: (name) => `/src/modules/${inflection.pluralize(name)}/dtos`,
    getFileName: (name) => `${inflection.singularize(name)}-create.dto.ts`
  },
  {
    key: "update-dto",
    getDirectory: (name) => `/src/modules/${inflection.pluralize(name)}/dtos`,
    getFileName: (name) => `${inflection.singularize(name)}-update.dto.ts`
  },
  {
    key: "list-args",
    getDirectory: (name) => `/src/modules/${inflection.pluralize(name)}/args`,
    getFileName: (name) => `${inflection.singularize(name)}-list.args.ts`
  },
  {
    key: "list-result",
    getDirectory: (name) => `/src/modules/${inflection.pluralize(name)}/args`,
    getFileName: (name) => `${inflection.singularize(name)}-list.result.ts`
  }
];

export interface IScaffoldInput {
  name: string;
  fields: IScaffoldInputField[];
  subEntities?: IScaffoldInput[];
  belongsToEntityNames?: string[];
}

export interface IScaffoldInputField {
  name: string;
  type: string;
  values?: string[];
  allowNull?: boolean;
  unique?: boolean;
  zerofill?: boolean;
  defaultValue?: any;
}

export interface IMetadata {
  name: string;
  fields?: IMetadataField[];
  originalName?: string;
  belongsToEntityNames?: string[];
  hasManyEntities?: any[];
  enums?: object;
  isSub?: boolean;
}

export interface IMetadataField {
  name: string;
  options: any;
  originType: string;
  ORMColumnType: any;
  typescriptType: any;
}
