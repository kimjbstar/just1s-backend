import { NBaseError } from "./../common/nbase-error";
import { StoreScopes, Store } from "./../models/store.model";
import { getFindScopesFromRequest } from "./../common/util";
export default class StoreService {
  static async find(req): Promise<object[]> {
    const { scopes, offset, limit } = getFindScopesFromRequest(
      req,
      Object.keys(StoreScopes())
    );
    const stores: Store[] = await Store.scope(scopes).findAll({
      offset: offset,
      limit: limit
    });
    return stores.map(store => store.get({ plain: true }));
  }

  static async findByPk(id): Promise<object> {
    const store: Store = await Store.findByPk(id);
    if (store == null) {
      throw new NBaseError(422, "data not found", "id를 확인해주세요");
    }
    return store;
  }
}
