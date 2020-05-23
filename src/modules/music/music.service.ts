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
import { Answer } from "@src/entities/answer.entity";

@Injectable()
export class MusicsService {
  constructor() {}

  async find(query): Promise<Music[]> {
    const musics: Music[] = await Music.find({
      relations: []
    });

    return Promise.resolve(musics);
  }

  async findByPk(id): Promise<Music> {
    const music: Music = await Music.findOne(id, {
      relations: []
    });

    return Promise.resolve(music);
  }

  async create(dto): Promise<Music> {
    const music: Music = new Music(dto);
    await music.save();
    await music.reload();

    return this.findByPk(music.id);
  }

  async update(id, dto): Promise<Music> {
    const result: UpdateResult = await Music.update(id, dto);
    if (result.raw.affectedRows === 0) {
      throw new WrongIdException();
    }
    if (result.raw.affectedRows > 1) {
      throw new UnexpectedUpdateResultException();
    }

    return this.findByPk(id);
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

  async checkCorrect(id, answer) {
    const music: Music = await Music.findOne(id, {
      relations: []
    });
    console.log(music);
    const isCorrect = music.checkCorrect(answer);
    return {
      music: music,
      isCorrect: isCorrect
    };
  }

  async recheckAllAnswers(id): Promise<any> {
    const answersToUpdate: Answer[] = [];
    const answers: Answer[] = await Answer.createQueryBuilder("answer")
      .innerJoinAndSelect("answer.deckMusic", "deck_music")
      .innerJoinAndSelect("deck_music.music", "music")
      .where("music.id = :id", { id: id })
      .getMany();

    answers.forEach((answer) => {
      const newIsCorrect = answer.deckMusic.music.checkCorrect(answer.answer);
      if (newIsCorrect != answer.isCorrect) {
        answer.isCorrect = newIsCorrect;
        answersToUpdate.push(answer);
      }
    });
    await Answer.save(answersToUpdate);
    // TODO : count
  }

  async register(dto) {
    const key: string = this.getKey(dto["link"]);
    let musicRow: Music = await Music.findOne({
      where: { key: key }
    });

    if (!musicRow) {
      if (dto["link"] != "") {
        dto["key"] = key;
      }
      musicRow = new Music(dto);
      await musicRow.save();
      await musicRow.reload();
    }
    return musicRow;
  }
}
