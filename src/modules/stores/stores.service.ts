import { Injectable } from "@nestjs/common";
import { StoreImage } from "../../models/store_image.model";
import { StoreScopes, Store } from "../../models/store.model";
import { UtilService } from "@src/services/util.service";
import {
  MissingParameterIDException,
  DataNotFoundException,
  MissingBodyToUpdateException,
  UnexpectedDeleteResultException,
  UnexpectedUpdateResultException,
  MissingBodyToCreateException
} from "@src/common/http-exception";

@Injectable()
export class StoresService {
  constructor(private readonly utilService: UtilService) {}

  async find(query): Promise<object[]> {
    const { scopes, offset, limit } = this.utilService.getFindScopesFromQuery(
      query,
      Object.keys(StoreScopes())
    );
    const stores: Store[] = await Store.scope(scopes).findAll({
      offset: offset,
      limit: limit
    });
    return stores.map((store) => store.get({ plain: true }));
  }

  async findByPk(id): Promise<object> {
    if (id === undefined) {
      throw new MissingParameterIDException();
    }
    const row: Store = await Store.findByPk(id);
    if (row == null) {
      throw new DataNotFoundException();
    }
    return row;
  }

  async create(req): Promise<object> {
    if (req.body.store === undefined) {
      throw new MissingBodyToCreateException();
    }
    const row = await Store.create(req.body.store, {
      include: [StoreImage]
    });
    if (row == null) {
      throw new DataNotFoundException();
    }

    return row.get({ plain: true });
  }

  async update(req): Promise<any> {
    if (req.params.id === undefined) {
      throw new MissingParameterIDException();
    }
    if (req.body.store === undefined) {
      throw new MissingBodyToUpdateException();
    }

    const [affectedRowCount] = await Store.update(req.body.store, {
      where: {
        id: req.params.id
      }
    });
    if (affectedRowCount != 1) {
      throw new UnexpectedUpdateResultException();
    }
    return affectedRowCount;
  }

  async destroy(req): Promise<any> {
    if (req.params.id === undefined) {
      throw new MissingParameterIDException();
    }

    const affectedRowCount = await Store.destroy({
      where: {
        id: req.params.id
      }
    });
    if (affectedRowCount != 1) {
      throw new UnexpectedDeleteResultException();
    }
    return affectedRowCount;
  }
}
