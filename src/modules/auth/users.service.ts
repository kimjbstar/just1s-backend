import { UserScopes } from "./../../models/user.model";
import { UtilService } from "./../../services/util.service";
import { Injectable, forwardRef } from "@nestjs/common";
import crypto from "crypto";
import { User } from "@src/models/user.model";
import {
  MissingParameterIDException,
  DataNotFoundException,
  MissingBodyToUpdateException,
  UnexpectedDeleteResultException,
  UnexpectedUpdateResultException,
  MissingBodyToCreateException
} from "@src/common/http-exception";

@Injectable()
export class UsersService {
  constructor(private readonly utilService: UtilService) {}

  // hashPw(pw: string): string {
  //   const salt = "f9dev-secret-salt-closedshops";
  //   return crypto
  //     .createHash("sha512")
  //     .update(pw + salt)
  //     .digest("hex");
  // }

  async findOne(req): Promise<object> {
    const { scopes } = this.utilService.getFindScopesFromRequest(
      req,
      Object.keys(UserScopes())
    );
    const user: User = await User.scope(scopes).findOne();
    return user.get({ plain: true });
  }

  async find(req): Promise<object[]> {
    const { scopes, offset, limit } = this.utilService.getFindScopesFromRequest(
      req,
      Object.keys(UserScopes())
    );
    const users: User[] = await User.scope(scopes).findAll({
      offset: offset,
      limit: limit
    });
    return users.map(user => user.get({ plain: true }));
  }

  async findByPk(req): Promise<object> {
    if (req.params.id === undefined) {
      throw new MissingParameterIDException();
    }
    const row: User = await User.findByPk(req.params.id);
    if (row == null) {
      throw new DataNotFoundException();
    }
    return row;
  }

  async create(req): Promise<object> {
    if (req.body.user === undefined) {
      throw new MissingBodyToCreateException();
    }
    const row = await User.create(req.body.user);
    if (row == null) {
      throw new DataNotFoundException();
    }

    return row.get({ plain: true });
  }

  async update(req): Promise<any> {
    if (req.params.id === undefined) {
      throw new MissingParameterIDException();
    }
    if (req.body.user === undefined) {
      throw new MissingBodyToUpdateException();
    }
    const [affectedRowCount] = await User.update(req.body.user, {
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

    const affectedRowCount = await User.destroy({
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
