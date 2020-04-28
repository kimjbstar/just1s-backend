import { Injectable } from "@nestjs/common";
import { DeckScopes, Deck } from "@src/models/deck.model";
import { UtilService } from "@src/services/util.service";
import {
  MissingParameterIDException,
  DataNotFoundException,
  MissingBodyToUpdateException,
  UnexpectedDeleteResultException,
  UnexpectedUpdateResultException,
  MissingBodyToCreateException
} from "@src/common/http-exception";
import { Music } from "@src/models/music.model";
import { MusicsService } from "../music/music.service";
import { DeckHashtag } from "@src/models/deckHashtag.model";
import { DeckMusic } from "@src/models/deckMusic.model";

@Injectable()
export class DecksService {
  constructor(
    private readonly utilService: UtilService,
    private readonly musicService: MusicsService
  ) {}

  async find(query): Promise<object[]> {
    const { scopes, offset, limit } = this.utilService.getFindScopesFromQuery(
      query,
      Object.keys(DeckScopes())
    );
    const decks: Deck[] = await Deck.scope(scopes).findAll({
      offset: offset,
      limit: limit
    });
    return decks.map((deck) => deck.get({ plain: true }));
  }

  async findByPk(id): Promise<object> {
    if (id === undefined) {
      throw new MissingParameterIDException();
    }
    const row: Deck = await Deck.findByPk(id);
    if (row == null) {
      throw new DataNotFoundException();
    }
    return row;
  }

  async create(dto): Promise<object> {
    if (dto === undefined) {
      throw new MissingBodyToCreateException();
    }
    const row: Deck = await Deck.create(dto, {
      include: [DeckHashtag, Music]
    });

    // music 유니크 처리

    if (row == null) {
      throw new DataNotFoundException();
    }

    return row.get({ plain: true });
  }

  async update(id, dto): Promise<any> {
    if (id === undefined) {
      throw new MissingParameterIDException();
    }
    if (dto === undefined) {
      throw new MissingBodyToUpdateException();
    }
    const [affectedRowCount] = await Deck.update(dto, {
      where: {
        id: id
      }
    });
    if (affectedRowCount != 1) {
      throw new UnexpectedUpdateResultException();
    }
    return affectedRowCount;
  }

  async destroy(id): Promise<any> {
    if (id === undefined) {
      throw new MissingParameterIDException();
    }

    const affectedRowCount = await Deck.destroy({
      where: {
        id: id
      }
    });
    if (affectedRowCount != 1) {
      throw new UnexpectedDeleteResultException();
    }
    return affectedRowCount;
  }

  async register(dto): Promise<object> {
    if (!dto.musics || !Array.isArray(dto.musics)) {
      throw new MissingBodyToCreateException();
    }

    // make music rows
    const musics: Music[] = [];
    for (const dtoMusic of dto.musics) {
      const key: string = this.musicService.getKey(dtoMusic["link"]);
      let musicRow = await Music.findOne({
        where: { key: key }
      });

      if (!musicRow) {
        if (dtoMusic["link"] != "") {
          dtoMusic["key"] = key;
        }
        musicRow = await Music.create(dtoMusic);
      }
      musics.push(musicRow);
    }
    dto.musics = [];

    const createdDeck = await Deck.create(dto, {
      include: [DeckHashtag]
    });
    await createdDeck.$set("musics", musics);

    const savedDeck: Deck = await Deck.findByPk(createdDeck.id, {
      include: [DeckHashtag, Music]
    });

    const result = savedDeck.get({ plain: true });
    result["musics"] = savedDeck.musics?.map((music) =>
      music.get({ plain: true })
    );
    result["hashtags"] = savedDeck.hashtags?.map((hashtag) =>
      hashtag.get({ plain: true })
    );

    return result;
  }
}
