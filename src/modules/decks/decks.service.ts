import { Injectable } from "@nestjs/common";
import { UtilService } from "@src/services/util.service";
import {
  MissingParameterIDException,
  DataNotFoundException,
  MissingBodyToUpdateException,
  UnexpectedDeleteResultException,
  UnexpectedUpdateResultException,
  MissingBodyToCreateException,
  WrongIdException,
  WrongRequestBody,
  CustomException
} from "@src/common/http-exception";
import { MusicsService } from "../music/music.service";
import { Deck } from "@src/entities/deck.entity";
import {
  Connection,
  UpdateResult,
  DeleteResult,
  MoreThanOrEqual
} from "typeorm";
import { Music } from "@src/entities/music.entity";
import { Expose, Type, plainToClass, classToPlain } from "class-transformer";
import { User } from "@src/entities/user.entity";
import { DeckMusic } from "@src/entities/deckMusic.entity";
import { UsersService } from "../users/users.service";
import { IsNotEmpty, validate, ValidationError } from "class-validator";
import { Answer } from "@src/entities/answer.entity";
import { Perform } from "@src/entities/perform.entity";
import { DeckPerformDto } from "./dtos/deck-perform.dto";
import { DeckHashtagSaveDto } from "./dtos/deck-hashtag-save.dto";
import { DeckHashtag } from "@src/entities/deckHashtag.entity";
import { DeckMusicSaveDto } from "./dtos/deck-music-save.dto";
import { DeckCreateDto } from "./dtos/deck-create.dto";
import { DeckUpdateDto } from "./dtos/deck-update.dto";

@Injectable()
export class DecksService {
  constructor(
    private readonly musicsService: MusicsService,
    private readonly usersService: UsersService
  ) {}

  async find(query): Promise<Deck[]> {
    const decks: Deck[] = await Deck.find({
      relations: ["user", "hashtags", "deckMusics", "deckMusics.music"]
    });
    return Promise.resolve(decks);
  }

  async findByPk(id: number): Promise<Deck> {
    const deck: Deck = await Deck.findOne(id, {
      relations: ["user", "hashtags", "deckMusics", "deckMusics.music"]
    });

    return Promise.resolve(deck);
  }

  async create(dto: DeckCreateDto): Promise<Deck> {
    if (dto.userId !== undefined) {
      dto["user"] = await User.findOneOrFail(dto.userId);
      delete dto.userId;
    }
    const hashtags = dto.hashtags ? dto.hashtags : [];
    if (dto.hashtags) {
      delete dto.hashtags;
    }
    const musics = dto.musics ? dto.musics : [];
    if (dto.musics) {
      delete dto.musics;
    }

    const deck: Deck = await new Deck(classToPlain(dto)).save();
    await this.saveHashtags(deck.id, hashtags);
    await this.saveMusics(deck.id, musics);
    return this.findByPk(deck.id);
  }

  async update(id: number, dto: DeckUpdateDto): Promise<Deck> {
    if (dto.userId !== undefined) {
      dto["user"] = await User.findOneOrFail(dto.userId);
      delete dto.userId;
    }
    const hashtags = dto.hashtags ? dto.hashtags : [];
    if (dto.hashtags) {
      delete dto.hashtags;
    }
    const musics = dto.musics ? dto.musics : [];
    if (dto.musics) {
      delete dto.musics;
    }

    const result: UpdateResult = await Deck.update(id, classToPlain(dto));
    if (result.raw.affectedRows === 0) {
      throw new WrongIdException();
    }
    if (result.raw.affectedRows > 1) {
      throw new UnexpectedUpdateResultException();
    }

    await this.saveHashtags(id, hashtags);
    await this.saveMusics(id, musics);
    return this.findByPk(id);
  }

  async destroy(id: number): Promise<any> {
    const result: DeleteResult = await Deck.delete(id);
    if (result.raw.affectedRows === 0) {
      throw new WrongIdException();
    }
    if (result.raw.affectedRows > 1) {
      throw new UnexpectedDeleteResultException();
    }
    return Promise.resolve();
  }

  async perform(dto): Promise<Perform> {
    const dtoClass: DeckPerformDto = plainToClass(DeckPerformDto, dto, {
      excludeExtraneousValues: true
    });
    const errors: ValidationError[] = await validate(dtoClass);
    if (errors.length > 0) {
      console.log(errors);
      throw new WrongRequestBody();
    }

    const deck = await Deck.findOneOrFail(dtoClass.deckId, {
      relations: ["deckMusics"]
    });
    if (!deck) {
      throw new WrongIdException();
    }

    const user = await User.findOneOrFail(dtoClass.userId, {});
    if (!user) {
      throw new WrongIdException();
    }

    const answers: Answer[] = [];
    for (const _answer of dtoClass.answers) {
      const deckMusic: DeckMusic = await DeckMusic.findOneOrFail(
        _answer.deckMusicId,
        { relations: ["deck", "music"] }
      );
      if (deckMusic.deck.id != deck.id) {
        throw new CustomException("답에 연결된 음악 정보가 잘못됨");
      }
      const answer = new Answer({
        deckMusic: deckMusic,
        answer: _answer.answer,
        isCorrect: deckMusic.music.checkCorrect(_answer.answer)
      });
      answers.push(answer);
    }
    if (answers.length != deck.deckMusics.length) {
      throw new CustomException("답 갯수가 다름");
    }

    let result;
    const oldOne: Perform = await Perform.findOne({
      where: {
        deckId: deck.id,
        userId: user.id
      },
      relations: [
        "deck",
        "user",
        "answers",
        "answers.deckMusic",
        "answers.deckMusic.music"
      ]
    });
    if (oldOne === undefined) {
      const perform: Perform = await new Perform({
        deck: deck,
        user: user,
        answers: answers
      });
      await perform.save();
      await this.usersService.updateCount(perform.user.id);
      result = perform;
      //TODO :deck average score
    } else {
      result = oldOne;
    }

    return Promise.resolve(result);
  }

  async saveHashtags(id, dtos: DeckHashtagSaveDto[]): Promise<Deck> {
    const oldOne: Deck = await this.findByPk(id);
    const newItems: DeckHashtag[] = [];

    if (dtos === undefined || dtos.length == 0) {
      return Promise.resolve(oldOne);
    }

    const newDto = dtos.filter((dto) => dto.id === undefined);
    for (const newDtoRow of newDto) {
      newItems.push(
        new DeckHashtag({
          hashtag: newDtoRow.hashtag
        })
      );
    }

    const dtoIDMap = dtos.reduce((result, dto) => {
      if (dto.id) {
        result[dto.id] = dto;
      }
      return result;
    }, {});
    const oldItems: DeckHashtag[] = oldOne.hashtags.reduce(
      (result, oldItem) => {
        // 명시 안됨 -> 변화 없음
        if (dtoIDMap[oldItem.id] === undefined) {
          result.push(oldItem);
          return result;
        }
        // 삭제 요청 체크된 항목 삭제 -> reduce 계산에 제외
        if (dtoIDMap[oldItem.id].toDelete) {
          return result;
        }
        // dto 기반 업데이트
        result.push(new DeckHashtag(dtoIDMap[oldItem.id]));
        return result;
      },
      []
    );
    oldOne.hashtags = [...oldItems, ...newItems];

    const deck: Deck = await oldOne.save();
    return Promise.resolve(deck);
  }

  async saveMusics(id, dtos: DeckMusicSaveDto[]): Promise<Deck> {
    const oldOne: Deck = await this.findByPk(id);
    const newItems: DeckMusic[] = [];

    if (dtos === undefined || dtos.length == 0) {
      return Promise.resolve(oldOne);
    }

    // insert 목록에 추가되거나, 아예 무시되거나
    const oldKeys = oldOne.deckMusics.map((deckMusic) => deckMusic.music.key);
    const newDto = dtos.filter((dto) => dto.id === undefined);
    for (const newDtoRow of newDto) {
      const musicRow = await this.musicsService.register(newDtoRow);
      if (!oldKeys.includes(musicRow.key)) {
        newItems.push(
          new DeckMusic({
            music: musicRow,
            second: newDtoRow.second
          })
        );
      }
    }

    const dtoIDMap = dtos.reduce((result, dto) => {
      if (dto.id) {
        result[dto.id] = dto;
      }
      return result;
    }, {});
    const oldItems: DeckMusic[] = oldOne.deckMusics.reduce(
      (result, oldItem) => {
        // 명시 안됨 -> 변화 없음
        if (dtoIDMap[oldItem.id] === undefined) {
          result.push(oldItem);
          return result;
        }
        // 삭제 요청 체크된 항목 삭제 -> reduce 계산에 제외
        if (dtoIDMap[oldItem.id].toDelete) {
          return result;
        }
        // dto 기반 업데이트
        result.push(new DeckMusic(dtoIDMap[oldItem.id]));
        return result;
      },
      []
    );
    oldOne.deckMusics = [...oldItems, ...newItems];

    const deck = await oldOne.save();
    return Promise.resolve(deck);
  }
}
