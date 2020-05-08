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
import { Music } from "@src/entities/music.entity";
import { classToPlain } from "class-transformer";

@Injectable()
export class MusicsService {
  constructor(private readonly utilService: UtilService) {}

  async find(query): Promise<object[]> {
    const decks: Music[] = await Music.find({
      relations: []
    });
    let result = decks.map((deck) => {
      return classToPlain(deck);
    });

    return Promise.resolve(result);
  }

  async findByPk(id): Promise<object> {
    const deck: Music = await Music.findOne(id, {
      relations: []
    });
    let result = classToPlain(deck);

    return Promise.resolve(result);
  }

  async create(dto): Promise<object> {
    const deck: Music = new Music(dto);
    await deck.save();

    let result = await this.findByPk(deck.id);
    result = classToPlain(result);

    return Promise.resolve(result);
  }

  async update(id, dto): Promise<any> {
    const result: UpdateResult = await Music.update(id, dto);
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
    const result: DeleteResult = await Music.delete(id);
    if (result.raw.affectedRows === 0) {
      throw new WrongIdException();
    }
    if (result.raw.affectedRows > 1) {
      throw new UnexpectedDeleteResultException();
    }
    return Promise.resolve();
  }

  getKey(link): string {
    let result = link;
    const youtubeLinkRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
    if (link.match(youtubeLinkRegex)) {
      result = link.match(youtubeLinkRegex)[1];
    }
    return result;
  }
}
