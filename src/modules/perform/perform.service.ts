import { Injectable } from "@nestjs/common";
import { UtilService } from "@src/services/util.service";
import {
  MissingParameterIDException,
  DataNotFoundException,
  MissingBodyToUpdateException,
  UnexpectedDeleteResultException,
  UnexpectedUpdateResultException,
  MissingBodyToCreateException,
  WrongIdException
} from "@src/common/http-exception";
import { UpdateResult, DeleteResult } from "typeorm";
import { Perform } from "@src/entities/perform.entity";
import { Answer } from "@src/entities/answer.entity";

@Injectable()
export class PerformsService {
  constructor() {}

  async find(query): Promise<Perform[]> {
    const performs: Perform[] = await Perform.find({
      relations: ["deck", "user", "answers"]
    });

    return Promise.resolve(performs);
  }

  async findByPk(id): Promise<Perform> {
    const perform: Perform = await Perform.findOne(id, {
      relations: [
        "deck",
        "user",
        "answers",
        "answers.deckMusic",
        "answers.deckMusic.music"
      ]
    });

    return Promise.resolve(perform);
  }

  async create(dto): Promise<Perform> {
    const perform: Perform = new Perform(dto);
    await perform.save();
    await perform.reload();

    return this.findByPk(perform.id);
  }

  async update(id, dto): Promise<Perform> {
    const result: UpdateResult = await Perform.update(id, dto);
    if (result.raw.affectedRows === 0) {
      throw new WrongIdException();
    }
    if (result.raw.affectedRows > 1) {
      throw new UnexpectedUpdateResultException();
    }

    return this.findByPk(id);
  }

  async destroy(id): Promise<any> {
    const result: DeleteResult = await Perform.delete(id);
    if (result.raw.affectedRows === 0) {
      throw new WrongIdException();
    }
    if (result.raw.affectedRows > 1) {
      throw new UnexpectedDeleteResultException();
    }
    return Promise.resolve();
  }
}
