import { Service } from "typedi";

@Service()
export default class NBaseService {
  getFindScopesFromRequest = (req, includes: string[]) => {
    const scopes = Object.keys(req.query)
      .filter(scope => !["offset", "limit"].includes(scope))
      .filter(scope => includes.includes(scope))
      .reduce((result, key, index) => {
        result.push({
          method: [key, req.query[key]]
        });
        return result;
      }, []);
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 5;
    return {
      scopes: scopes,
      offset: offset,
      limit: limit
    };
  };
}
