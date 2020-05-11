import { Injectable } from "@nestjs/common";
import {
  MissingParameterIDException,
  DataNotFoundException,
  MissingBodyToUpdateException,
  UnexpectedDeleteResultException,
  UnexpectedUpdateResultException,
  MissingBodyToCreateException,
  WrongIdException
} from "@src/common/http-exception";
import { User } from "@src/entities/user.entity";
import { UpdateResult, DeleteResult } from "typeorm";

@Injectable()
export class UsersService {
  constructor() {}

  // hashPw(pw: string): string {
  //   const salt = "f9dev-secret-salt-closedshops";
  //   return crypto
  //     .createHash("sha512")
  //     .update(pw + salt)
  //     .digest("hex");
  // }

  async find(query): Promise<object[]> {
    const users: User[] = await User.find({
      relations: []
    });

    return Promise.resolve(users);
  }

  async findByPk(id): Promise<object> {
    const user: User = await User.findOne(id, {
      relations: []
    });

    return Promise.resolve(user);
  }

  async create(dto): Promise<object> {
    const user: User = new User(dto);
    await user.save();
    await user.reload();

    return this.findByPk(user.id);
  }

  async update(id, dto): Promise<any> {
    const result: UpdateResult = await User.update(id, dto);
    if (result.raw.affectedRows === 0) {
      throw new WrongIdException();
    }
    if (result.raw.affectedRows > 1) {
      throw new UnexpectedUpdateResultException();
    }

    const user = await this.findByPk(id);
    return this.findByPk(id);
  }

  async destroy(id): Promise<any> {
    const result: DeleteResult = await User.delete(id);
    if (result.raw.affectedRows === 0) {
      throw new WrongIdException();
    }
    if (result.raw.affectedRows > 1) {
      throw new UnexpectedDeleteResultException();
    }
    return Promise.resolve();
  }
}
