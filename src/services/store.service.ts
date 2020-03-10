import { StoreImage } from "./../models/store_image.model";
import { NBaseError } from "./../common/nbase-error";
import { StoreScopes, Store } from "./../models/store.model";
import NBaseService from "./nbase.service";
import { Container, Service } from "typedi";

@Service()
export default class StoreService {
  async find(req): Promise<object[]> {
    const nbaseService: NBaseService = Container.get(NBaseService);
    const { scopes, offset, limit } = nbaseService.getFindScopesFromRequest(
      req,
      Object.keys(StoreScopes())
    );
    const stores: Store[] = await Store.scope(scopes).findAll({
      offset: offset,
      limit: limit
    });
    return stores.map(store => store.get({ plain: true }));
  }

  async findByPk(req): Promise<object> {
    if (req.params.id === undefined) {
      throw new NBaseError(404, "찾을 id가 없습니다.");
    }
    const row: Store = await Store.findByPk(req.params.id);
    if (row == null) {
      throw new NBaseError(422, "data not found", "데이터가 없습니다.");
    }
    return row;
  }

  async create(req): Promise<object> {
    if (req.body.store === undefined) {
      throw new NBaseError(404, "추가할 데이터가 없습니다.");
    }
    const row = await Store.create(req.body.store, {
      include: [StoreImage]
    });
    if (row == null) {
      throw new NBaseError(422, "data not found", "데이터가 없습니다.");
    }

    return row.get({ plain: true });
  }

  async update(req): Promise<any> {
    if (req.params.id === undefined) {
      throw new NBaseError(404, "업데이트할 id가 없습니다.");
    }
    if (req.body.store === undefined) {
      throw new NBaseError(404, "업데이트할 데이터가 없습니다.");
    }
    const [affectedRowCount] = await Store.update(req.body.store, {
      where: {
        id: req.params.id
      }
    });
    if (affectedRowCount != 1) {
      throw new NBaseError(
        500,
        "의도치 않게 2 row 이상의 데이터가 변경되었습니다."
      );
    }
    return affectedRowCount;
  }

  static async destroy(req): Promise<any> {
    if (req.params.id === undefined) {
      throw new NBaseError(404, "삭제할 id가 없습니다.");
    }

    const affectedRowCount = await Store.destroy({
      where: {
        id: req.params.id
      }
    });
    if (affectedRowCount != 1) {
      throw new NBaseError(
        500,
        "의도치 않게 2 row 이상의 데이터가 변경되었습니다."
      );
    }
    return affectedRowCount;
  }
}
