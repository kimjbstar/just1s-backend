import { Injectable } from "@nestjs/common";
import {
  UnexpectedDeleteResultException,
  UnexpectedUpdateResultException,
  WrongIdException,
  WrongRequestBody,
  CustomException
} from "@src/common/http-exception";
import { MusicsService } from "../music/music.service";
import { Deck } from "@src/entities/deck.entity";
import { UpdateResult, DeleteResult } from "typeorm";
import { plainToClass, classToPlain } from "class-transformer";
import { User } from "@src/entities/user.entity";
import { DeckMusic } from "@src/entities/deckMusic.entity";
import { UsersService } from "../users/users.service";
import { validate, ValidationError } from "class-validator";
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
    const deckMusics = dto.deckMusics ? dto.deckMusics : [];
    if (dto.deckMusics) {
      delete dto.deckMusics;
    }

    const deck: Deck = await new Deck(classToPlain(dto)).save();
    await this.saveHashtags(deck.id, hashtags);
    await this.saveDeckMusics(deck.id, deckMusics);
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
    const deckMusics = dto.deckMusics ? dto.deckMusics : [];
    if (dto.deckMusics) {
      delete dto.deckMusics;
    }

    const result: UpdateResult = await Deck.update(id, classToPlain(dto));
    if (result.raw.affectedRows === 0) {
      throw new WrongIdException();
    }
    if (result.raw.affectedRows > 1) {
      throw new UnexpectedUpdateResultException();
    }

    await this.saveHashtags(id, hashtags);
    await this.saveDeckMusics(id, deckMusics);
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

  async perform(dto: DeckPerformDto, ipAddress: string): Promise<Perform> {
    const dtoClass: DeckPerformDto = plainToClass(DeckPerformDto, dto);
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

    let user: User = null;
    if (dtoClass.userId) {
      const user = await User.findOne(dtoClass.userId, {});
      if (!user) {
        throw new WrongIdException();
      }
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
      if (oldOne) {
        return Promise.resolve(oldOne);
      }
    }

    const perform: Perform = await new Perform({
      deck: deck,
      user: user,
      ipAddress: ipAddress,
      answers: answers
    });
    const result: Perform = await perform.save();
    if (result.user) {
      await this.usersService.updateCount(result.user.id);
    }

    //TODO :deck average score
    return Promise.resolve(result);
  }

  async saveHashtags(id, dtos: DeckHashtagSaveDto[]): Promise<Deck> {
    const oldOne: Deck = await this.findByPk(id);

    if (dtos === undefined || dtos.length == 0) {
      return Promise.resolve(oldOne);
    }

    const newItems: DeckHashtag[] = dtos
      .filter((dto) => dto.id === undefined)
      .map((newDto) => new DeckHashtag(newDto));

    const dtoIDMap = dtos.reduce((result, dto) => {
      if (dto.id) {
        result[dto.id] = dto;
      }
      return result;
    }, {});
    console.log(dtoIDMap);
    const oldItems: DeckHashtag[] = oldOne.hashtags.reduce(
      (result, oldItem) => {
        // 명시 안됨 -> 변화 없음
        if (dtoIDMap[oldItem.id] === undefined) {
          result.push(new DeckHashtag({ id: oldItem.id }));
          return result;
        }
        // 삭제 요청 체크된 항목 삭제 -> reduce 계산에 제외
        if (
          dtoIDMap[oldItem.id].toDelete === true ||
          dtoIDMap[oldItem.id].toDelete === "true"
        ) {
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

  async saveDeckMusics(id, dtos: DeckMusicSaveDto[]): Promise<Deck> {
    const oldOne: Deck = await this.findByPk(id);

    if (dtos === undefined || dtos.length == 0) {
      return Promise.resolve(oldOne);
    }

    // step 1 : dtos의 key기반 등록 및 중복 체크, 중복 발견 시 종료 ( 중복되는 음악이 있습니다.)
    // step 2 : step 1을 돌면서 dto에 musicRow 추가 ( insert/update만 해당됨 )

    const keys = [];
    for (const [index, dto] of dtos.entries()) {
      console.log(dto);
      // 기존 dto에 서 key가 안오므로 ....
      let musicRow;
      if (dto.id) {
        const oldDeckMusic = oldOne.deckMusics.find(
          (deckMusic) => deckMusic.id === dto.id
        );
        if (oldDeckMusic === undefined) {
          continue;
        }
        musicRow = oldDeckMusic.music;
      } else {
        musicRow = await this.musicsService.register(dto);
      }

      if (dto.toDelete && dto.toDelete === true) {
        continue;
      }
      if (keys.includes(musicRow.key)) {
        throw Error("중복된 음악이 있습니다.");
      }
      keys.push(musicRow.key);
      if (!dto.id) {
        dtos[index]["music"] = musicRow;
      }
    }

    // step 3 : 기존 업데이트 로직
    const newItems: DeckMusic[] = dtos
      .filter((dto) => dto.id === undefined)
      .map((newDto) => new DeckMusic(newDto));

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
          result.push(new DeckMusic({ id: oldItem.id }));
          return result;
        }
        // 삭제 요청 체크된 항목 삭제 -> reduce 계산에 제외
        if (
          dtoIDMap[oldItem.id].toDelete === true ||
          dtoIDMap[oldItem.id].toDelete === "true"
        ) {
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
