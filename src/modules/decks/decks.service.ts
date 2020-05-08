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
import { Connection, UpdateResult, DeleteResult } from "typeorm";
import { Music } from "@src/entities/music.entity";
import { classToPlain, Expose, Type, plainToClass } from "class-transformer";
import { User } from "@src/entities/user.entity";
import { DeckMusic } from "@src/entities/deckMusic.entity";
import { UsersService } from "../users/users.service";
import { IsNotEmpty, validate, ValidationError } from "class-validator";
import { Answer } from "@src/entities/answer.entity";
import { Perform } from "@src/entities/perform.entity";

export class DeckPerformDto {
  @Expose()
  @IsNotEmpty()
  deckId: number;

  @IsNotEmpty()
  @Expose()
  userId: number;

  @Expose()
  @IsNotEmpty()
  @Type(() => DeckPerformAnswerDto)
  answers: DeckPerformAnswerDto[];
}
export class DeckPerformAnswerDto {
  @Expose()
  @IsNotEmpty()
  deckMusicId: number;

  @Expose()
  @IsNotEmpty()
  answer: string;
}

@Injectable()
export class DecksService {
  constructor(
    private readonly utilService: UtilService,
    private readonly musicsService: MusicsService,
    private readonly usersService: UsersService
  ) {}

  async find(query): Promise<object[]> {
    const decks: Deck[] = await Deck.find({
      relations: ["user", "hashtags", "deckMusics", "deckMusics.music"]
    });
    let result = decks.map((deck) => {
      return classToPlain(deck);
    });

    return Promise.resolve(result);
  }

  async findByPk(id): Promise<object> {
    const deck: Deck = await Deck.findOne(id, {
      relations: ["user", "hashtags", "deckMusics", "deckMusics.music"]
    });
    let result = classToPlain(deck);

    return Promise.resolve(result);
  }

  async create(dto): Promise<object> {
    const deck: Deck = new Deck(dto);
    await deck.save();

    let result = await this.findByPk(deck.id);
    result = classToPlain(result);

    return Promise.resolve(result);
  }

  async update(id, dto): Promise<any> {
    const result: UpdateResult = await Deck.update(id, dto);
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
    const result: DeleteResult = await Deck.delete(id);
    if (result.raw.affectedRows === 0) {
      throw new WrongIdException();
    }
    if (result.raw.affectedRows > 1) {
      throw new UnexpectedDeleteResultException();
    }
    return Promise.resolve();
  }

  async register(dto): Promise<object> {
    if (!dto.musics || !Array.isArray(dto.musics)) {
      throw new MissingBodyToCreateException();
    }

    // TODO : 비동기 reduce 처리
    dto.deckMusics = [];
    for (const dtoMusic of dto.musics) {
      const key: string = this.musicsService.getKey(dtoMusic["link"]);
      let musicRow: Music = await Music.findOne({
        where: { key: key }
      });

      if (!musicRow) {
        if (dtoMusic["link"] != "") {
          dtoMusic["key"] = key;
        }
        musicRow = new Music(dtoMusic);
        await musicRow.save();
        await musicRow.reload();
      }
      dto.deckMusics.push(
        new DeckMusic({
          music: musicRow,
          second: dtoMusic.second
        })
      );
    }
    delete dto.musics;

    // make foreignKey to object
    if (dto.userId !== undefined) {
      dto.user = new User({ id: dto.userId });
      delete dto.userId;
    }

    return this.create(dto);
  }

  async perform(dto): Promise<object> {
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
        isCorrect: deckMusic.music.title === _answer.answer
      });
      answers.push(answer);
    }
    if (answers.length != deck.deckMusics.length) {
      throw new CustomException("답 갯수가 다름");
    }

    const perform: Perform = await new Perform({
      deck: deck,
      user: user,
      answers: answers
    });

    const oldOne: Perform = await Perform.findOne({
      where: {
        deckId: deck.id,
        userId: user.id
      },
      relations: ["deck", "user", "answers", "answers.deckMusic"]
    });
    if (oldOne === undefined) {
      await perform.save();
    }
    const result = oldOne !== undefined ? oldOne : await perform.save();

    return Promise.resolve(result);
  }
}
