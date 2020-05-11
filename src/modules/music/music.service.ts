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

@Injectable()
export class MusicsService {
  constructor(private readonly utilService: UtilService) {}

  async find(query): Promise<object[]> {
    const musics: Music[] = await Music.find({
      relations: []
    });

    return Promise.resolve(musics);
  }

  async findByPk(id): Promise<object> {
    const music: Music = await Music.findOne(id, {
      relations: []
    });

    return Promise.resolve(music);
  }

  async create(dto): Promise<object> {
    const music: Music = new Music(dto);
    await music.save();
    await music.reload();

    return this.findByPk(music.id);
  }

  async update(id, dto): Promise<any> {
    const result: UpdateResult = await Music.update(id, dto);
    if (result.raw.affectedRows === 0) {
      throw new WrongIdException();
    }
    if (result.raw.affectedRows > 1) {
      throw new UnexpectedUpdateResultException();
    }

    const music = await this.findByPk(id);
    return Promise.resolve(music);
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
