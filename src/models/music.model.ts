// import { Op, Sequelize } from "sequelize";
// import {
//   Table,
//   Column,
//   Model,
//   DataType,
//   DefaultScope,
//   Scopes,
//   ScopesOptionsGetter,
//   BelongsToMany,
//   BeforeCreate
// } from "sequelize-typescript";
// import { MusicListOrderBys } from "@src/modules/music/music.enum";
// import { Deck } from "./deck.model";
// import { DeckMusic } from "./deckMusic.model";
// import { Hook } from "mocha";

// export const MusicScopes: ScopesOptionsGetter = () => ({
//   title: (value) => {
//     return {
//       where: { title: value }
//     };
//   },
//   artist: (value) => {
//     return {
//       where: { artist: value }
//     };
//   },
//   link: (value) => {
//     return {
//       where: { link: value }
//     };
//   },
//   averageScore: (value) => {
//     return {
//       where: { averageScore: value }
//     };
//   },
//   belogsDecksCount: (value) => {
//     return {
//       where: { belogsDecksCount: value }
//     };
//   },
//   performsCount: (value) => {
//     return {
//       where: { performsCount: value }
//     };
//   },
//   order: (value) => {
//     if (MusicListOrderBys[value] == undefined) {
//       return {};
//     }
//     const { cursor, orderBy } = MusicListOrderBys[value];
//     return {
//       attributes: {
//         include: [[Sequelize.literal(cursor), "cursor"]]
//       },
//       order: orderBy
//     };
//   },
//   after: (value, orderbyKey) => {
//     if (MusicListOrderBys[orderbyKey] == undefined) {
//       return {};
//     }
//     const { cursor, orderBy } = MusicListOrderBys[orderbyKey];
//     return {
//       where: {
//         [Op.and]: Sequelize.literal(`${cursor} < ${value}`)
//       }
//     };
//   }
// });
// @DefaultScope(() => ({
//   include: []
// }))
// @Scopes(MusicScopes)
// @Table
// export class Music extends Model<Music> {
//   @Column({
//     type: DataType.STRING(256),
//     allowNull: false
//   })
//   title: string;

//   @Column({
//     type: DataType.STRING(256),
//     allowNull: false
//   })
//   artist: string;

//   @Column({
//     type: DataType.STRING(256),
//     allowNull: false,
//     defaultValue: ""
//   })
//   link: string;

//   @Column({
//     type: DataType.STRING(256),
//     allowNull: false
//   })
//   key: string;

//   @Column({
//     type: DataType.INTEGER,
//     defaultValue: 0
//   })
//   averageScore: number;

//   @Column({
//     type: DataType.INTEGER,
//     defaultValue: 0
//   })
//   belogsDecksCount: number;

//   @Column({
//     type: DataType.INTEGER,
//     defaultValue: 0
//   })
//   performsCount: number;

//   @BelongsToMany(() => Deck, () => DeckMusic)
//   decks: Deck[];
// }
