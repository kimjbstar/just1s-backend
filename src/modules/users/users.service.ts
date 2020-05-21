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
import { Perform } from "@src/entities/perform.entity";
import { Answer } from "@src/entities/answer.entity";
import { UserSNSType } from "./users.enum";

@Injectable()
export class UsersService {
  constructor() {}

  async find(query): Promise<User[]> {
    const users: User[] = await User.find({
      relations: []
    });

    return Promise.resolve(users);
  }

  async findByPk(id): Promise<User> {
    const user: User = await User.findOne(id, {
      relations: []
    });

    return Promise.resolve(user);
  }

  async create(dto): Promise<User> {
    const user: User = new User(dto);
    await user.save();
    await user.reload();

    return this.findByPk(user.id);
  }

  async update(id, dto): Promise<User> {
    const result: UpdateResult = await User.update(id, dto);
    if (result.raw.affectedRows === 0) {
      throw new WrongIdException();
    }
    if (result.raw.affectedRows > 1) {
      throw new UnexpectedUpdateResultException();
    }

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

  async updateCount(id: number): Promise<void> {
    const userPerformCount = await Perform.createQueryBuilder()
      .innerJoin(User, "user")
      .where("perform.userId = :userId", { userId: id })
      .getCount();
    const userAnswerCount = await Answer.createQueryBuilder()
      .innerJoin(Perform, "perform")
      .innerJoin(User, "user")
      .where("perform.userId = :userId", { userId: id })
      .getCount();

    await User.update(id, {
      performedDecksCount: userPerformCount,
      performedMusicsCount: userAnswerCount
    });
    // TODO : 카운트 정책 정리, 정답률 필드 추가
  }

  async findOrCreateByFacebook(profile: any): Promise<User> {
    const oldOne = await User.findOneOrFail({
      snsKey: profile.id
    });
    if (oldOne) {
      return oldOne;
    }
    const newOne = new User({
      email: profile.emails[0].value,
      name: profile.name.givenName,
      snsKey: profile.id,
      imgUrl: profile.photos[0].value,
      snsType: UserSNSType.FACEBOOK
    });
    return newOne.save();
  }
}
