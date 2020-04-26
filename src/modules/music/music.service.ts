import { Injectable } from "@nestjs/common";
import { MusicScopes, Music } from "@src/models/music.model";
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
export class MusicService {
  constructor(private readonly utilService: UtilService) {}

  async find(query): Promise<object[]> {
    const { scopes, offset, limit } = this.utilService.getFindScopesFromQuery(
      query,
      Object.keys(MusicScopes())
    );
    const music: Music[] = await Music.scope(scopes).findAll({
      offset: offset,
      limit: limit
    });
    return music.map(music => music.get({ plain: true }));
  }

  async findByPk(id): Promise<object> {
    if (id === undefined) {
      throw new MissingParameterIDException();
    }
    const row: Music = await Music.findByPk(id);
    if (row == null) {
      throw new DataNotFoundException();
    }
    return row;
  }

  async create(dto): Promise<object> {
    if (dto === undefined) {
      throw new MissingBodyToCreateException();
    }
    const row = await Music.create(dto, {
      include: [ ]
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
    const [affectedRowCount] = await Music.update(dto, {
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

    const affectedRowCount = await Music.destroy({
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
