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
import { Expose, Type, plainToClass } from "class-transformer";
import { User } from "@src/entities/user.entity";
import { DeckMusic } from "@src/entities/deckMusic.entity";
import { UsersService } from "../users/users.service";
import { IsNotEmpty, validate, ValidationError } from "class-validator";
import { Answer } from "@src/entities/answer.entity";
import { Perform } from "@src/entities/perform.entity";
import { DeckPerformDto } from "./dtos/deck-perform.dto";
import { DeckHashtagSaveDto } from "./dtos/deck-hashtag-save.dto";
import { DeckHashtag } from "@src/entities/deckHashtag.entity";

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

  async findByPk(id): Promise<Deck> {
    const deck: Deck = await Deck.findOne(id, {
      relations: ["user", "hashtags", "deckMusics", "deckMusics.music"]
    });

    return Promise.resolve(deck);
  }

  async create(dto): Promise<Deck> {
    const deck: Deck = new Deck(dto);
    await deck.save();
    await deck.reload();
    return this.findByPk(deck.id);
  }

  async update(id, dto): Promise<Deck> {
    const result: UpdateResult = await Deck.update(id, dto);
    if (result.raw.affectedRows === 0) {
      throw new WrongIdException();
    }
    if (result.raw.affectedRows > 1) {
      throw new UnexpectedUpdateResultException();
    }

    return this.findByPk(id);
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

  async register(dto): Promise<Deck> {
    if (!dto.musics || !Array.isArray(dto.musics)) {
      throw new MissingBodyToCreateException();
    }

    // TODO : 비동기 reduce 처리
    dto.deckMusics = [];
    for (const dtoMusic of dto.musics) {
      const musicRow = await this.musicsService.register(dtoMusic);
      dto.deckMusics.push(
        new DeckMusic({
          music: musicRow,
          second: dtoMusic.second
        })
      );
    }
    delete dto.musics;

    if (dto.userId !== undefined) {
      dto.user = new User({ id: dto.userId });
      delete dto.userId;
    }

    return this.create(dto);
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

  async saveHashtags(id, dto: DeckHashtagSaveDto[]): Promise<Deck> {
    const deck: Deck = await this.findByPk(id);

    deck.hashtags = dto
      .filter(
        (dtoRow) =>
          (dtoRow.id !== undefined && dtoRow.toDelete == false) ||
          dtoRow.id === undefined
      )
      .map((dtoRow) => {
        delete dtoRow.toDelete;
        return new DeckHashtag(dtoRow);
      });

    await deck.save();
    await deck.reload();
    return Promise.resolve(deck);
  }
}
