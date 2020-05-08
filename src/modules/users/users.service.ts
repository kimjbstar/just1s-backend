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
import { classToPlain } from "class-transformer";
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
    const decks: User[] = await User.find({
      relations: []
    });
    let result = decks.map((deck) => {
      return classToPlain(deck);
    });

    return Promise.resolve(result);
  }

  async findByPk(id): Promise<object> {
    const deck: User = await User.findOne(id, {
      relations: []
    });
    let result = classToPlain(deck);

    return Promise.resolve(result);
  }

  async create(dto): Promise<object> {
    const deck: User = new User(dto);
    await deck.save();

    let result = await this.findByPk(deck.id);
    result = classToPlain(result);

    return Promise.resolve(result);
  }

  async update(id, dto): Promise<any> {
    const result: UpdateResult = await User.update(id, dto);
    if (result.raw.affectedRows === 0) {
      throw new WrongIdException();
    }
    if (result.raw.affectedRows > 1) {
      throw new UnexpectedUpdateResultException();
    }

    const deck = await this.findByPk(id);
    return Promise.resolve(deck);
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
