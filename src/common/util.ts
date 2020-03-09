export const getFindScopesFromQuery = (
  query,
  includes: string[],
  excludes?: string[]
) => {
  const scopes = Object.keys(query)
    .filter(scope => !["offset", "limit"].includes(scope))
    .filter(scope => includes.includes(scope))
    .reduce((result, key, index) => {
      result.push({
        method: [key, query[key]]
      });
      return result;
    }, []);
  const offset = Number(query.offset) || 0;
  const limit = Number(query.limit) || 5;
  return {
    scopes: scopes,
    offset: offset,
    limit: limit
  };
};
