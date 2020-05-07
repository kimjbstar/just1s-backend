import {MigrationInterface, QueryRunner} from "typeorm";

export class setAllDefaultValue1588743240187 implements MigrationInterface {
    name = 'setAllDefaultValue1588743240187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `music` CHANGE `title` `title` varchar(255) NOT NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `music` CHANGE `artist` `artist` varchar(255) NOT NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `music` CHANGE `link` `link` varchar(255) NOT NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `music` CHANGE `averageScore` `averageScore` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `music` CHANGE `belogsDecksCount` `belogsDecksCount` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `music` CHANGE `performsCount` `performsCount` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `deck_music` CHANGE `second` `second` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `averageScore` `averageScore` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `deck` CHANGE `title` `title` varchar(255) NOT NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `deck` CHANGE `hitsCount` `hitsCount` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `deck` CHANGE `averageScore` `averageScore` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `answer` CHANGE `answer` `answer` varchar(255) NOT NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `answer` CHANGE `isCorrect` `isCorrect` tinyint NOT NULL DEFAULT 0", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `answer` CHANGE `isCorrect` `isCorrect` tinyint NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `answer` CHANGE `answer` `answer` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `deck` CHANGE `averageScore` `averageScore` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `deck` CHANGE `hitsCount` `hitsCount` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `deck` CHANGE `title` `title` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `averageScore` `averageScore` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `deck_music` CHANGE `second` `second` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `music` CHANGE `performsCount` `performsCount` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `music` CHANGE `belogsDecksCount` `belogsDecksCount` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `music` CHANGE `averageScore` `averageScore` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `music` CHANGE `link` `link` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `music` CHANGE `artist` `artist` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `music` CHANGE `title` `title` varchar(255) NOT NULL", undefined);
    }

}
