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
import { MusicsService } from "../music/music.service";
import { Deck } from "@src/entities/deck.entity";
import { Connection, UpdateResult, DeleteResult } from "typeorm";
import { Music } from "@src/entities/music.entity";
import { classToPlain } from "class-transformer";
import { User } from "@src/entities/user.entity";
import { DeckMusic } from "@src/entities/deckMusic.entity";
import { UsersService } from "../users/users.service";

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
    if (!dto.userId || !dto.user) {
      throw new MissingBodyToCreateException();
    }
    if (!dto.deckId || !dto.deck) {
      throw new MissingBodyToCreateException();
    }
    if (!dto.answers || !Array.isArray(dto.answers)) {
      throw new MissingBodyToCreateException();
    }
    if (dto.userId !== undefined) {
      dto.user = new User({ id: dto.userId });
      if (!dto.user) {
        throw new WrongIdException();
      }
      delete dto.userId;
    }
    if (dto.deckId !== undefined) {
      dto.deck = new Deck({ id: dto.deckId });
      if (!dto.deck) {
        throw new WrongIdException();
      }
      delete dto.deckId;
    }
    return Promise.resolve({});
    // 복잡한 dto 인터페이스로 체크 가능한지
    // answers 돌면서 answers 개체 생성
    // 돌면서 꼴도 체크
    // answers 길이랑 deck music 길이랑 같은지 체크
    // 임시 채점

    // TODO : 비동기 reduce 처리
    // dto.deckMusics = [];
    // for (const dtoMusic of dto.musics) {
    //   const key: string = this.musicsService.getKey(dtoMusic["link"]);
    //   let musicRow: Music = await Music.findOne({
    //     where: { key: key }
    //   });

    //   if (!musicRow) {
    //     if (dtoMusic["link"] != "") {
    //       dtoMusic["key"] = key;
    //     }
    //     musicRow = new Music(dtoMusic);
    //     await musicRow.save();
    //     await musicRow.reload();
    //   }
    //   dto.deckMusics.push(
    //     new DeckMusic({
    //       music: musicRow,
    //       second: dtoMusic.second
    //     })
    //   );
    // }
    // delete dto.musics;

    // // make foreignKey to object
    // if (dto.userId !== undefined) {
    //   dto.user = new User({ id: dto.userId });
    //   delete dto.userId;
    // }

    // return this.create(dto);
  }
}
