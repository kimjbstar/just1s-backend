import * as inflection from "inflection";

export const TEMPLATE_TYPES = [
  {
    key: "model",
    getDirectory: (name) => `/src/models`,
    getFileName: (name) =>
      `${inflection.underscore(inflection.singularize(name))}.model.ts`,
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
  }
];

export interface IScaffoldInput {
  name: string;
  fields: IScaffoldInputField[];
  subModels?: IScaffoldInput[];
  belongsToModels?: string[];
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
  belongsToModels?: string[];
  hasManyModels?: any[];
  enums?: object;
  isSub?: boolean;
}

export interface IMetadataField {
  name: string;
  options: any;
  originType: string;
  seqType: any;
  tsType: any;
}

export const tsTypes = {
  BOOLEAN: "boolean",
  VARCHAR: "string",
  DECIMAL: "number",
  INTEGER: "number",
  DATE: "Date"
};
