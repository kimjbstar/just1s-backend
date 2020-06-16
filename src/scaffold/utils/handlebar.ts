import * as inflection from "inflection";
export const HandlebarHelpers = {
  pluralize: (str) => {
    return inflection.pluralize(str);
  },
  capitalize: (str) => inflection.capitalize(str),
  plucapitalize: (str) => inflection.pluralize(inflection.capitalize(str)),
  singularize: (str) => inflection.singularize(str),
  underscore: (str) => inflection.underscore(str),
  camelize: (str) => inflection.camelize(str),
  camelizeFirstLow: (str) => inflection.camelize(str, true),
  toLowerCase: (str) => str.toLowerCase(),
  toUpperCase: (str) => str.toUpperCase(),
  ifCond: (v1, operator, v2, options) => {
    switch (operator) {
      case "==":
        return v1 == v2 ? options.fn(this) : options.inverse(this);
      case "===":
        return v1 === v2 ? options.fn(this) : options.inverse(this);
      case "!=":
        return v1 != v2 ? options.fn(this) : options.inverse(this);
      case "!==":
        return v1 !== v2 ? options.fn(this) : options.inverse(this);
      case "<":
        return v1 < v2 ? options.fn(this) : options.inverse(this);
      case "<=":
        return v1 <= v2 ? options.fn(this) : options.inverse(this);
      case ">":
        return v1 > v2 ? options.fn(this) : options.inverse(this);
      case ">=":
        return v1 >= v2 ? options.fn(this) : options.inverse(this);
      case "&&":
        return v1 && v2 ? options.fn(this) : options.inverse(this);
      case "||":
        return v1 || v2 ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  },
  encode: (str) => new Handlebars.SafeString(str)
};
