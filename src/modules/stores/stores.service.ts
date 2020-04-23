import { Injectable } from "@nestjs/common";
import { StoreImage } from "@src/models/store_image.model";
import { StoreScopes, Store } from "@src/models/store.model";
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

  async create(dto): Promise<object> {
    if (dto === undefined) {
      throw new MissingBodyToCreateException();
    }
    const row = await Store.create(dto, {
      include: [StoreImage]
    });
    if (row == null) {
      throw new DataNotFoundException();
    }

    return row.get({ plain: true });
  }

  async update(id, dto): Promise<any> {
    if (id === undefined) {
      throw new MissingParameterIDException();
    }
    if (dto === undefined) {
      throw new MissingBodyToUpdateException();
    }
    const [affectedRowCount] = await Store.update(dto, {
      where: {
        id: id
      }
    });
    if (affectedRowCount != 1) {
      throw new UnexpectedUpdateResultException();
    }
    return affectedRowCount;
  }

  async destroy(id): Promise<any> {
    if (id === undefined) {
      throw new MissingParameterIDException();
    }

    const affectedRowCount = await Store.destroy({
      where: {
        id: id
      }
    });
    if (affectedRowCount != 1) {
      throw new UnexpectedDeleteResultException();
    }
    return affectedRowCount;
  }
}
