import {MigrationInterface, QueryRunner} from "typeorm";

export class init1588605374713 implements MigrationInterface {
    name = 'init1588605374713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `deck_hashtag` (`id` int NOT NULL AUTO_INCREMENT, `hashtag` varchar(255) NOT NULL DEFAULT '', `deckId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `music` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `artist` varchar(255) NOT NULL, `link` varchar(255) NOT NULL, `averageScore` int NOT NULL, `belogsDecksCount` int NOT NULL, `performsCount` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `deck_music` (`id` int NOT NULL AUTO_INCREMENT, `second` int NOT NULL, `deckId` int NULL, `musicId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `deck` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `hitsCount` int NOT NULL, `averageScore` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `snsType` enum ('EMAIL', 'FACEBOOK', 'INSTAGRAM', 'NAVER') NOT NULL DEFAULT 'EMAIL', `status` enum ('NORMAL', 'WITHDRAWN') NOT NULL DEFAULT 'NORMAL', `snsKey` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `imgUrl` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `createdDecksCount` int NOT NULL DEFAULT 0, `performedMusicsCount` int NOT NULL DEFAULT 0, `performedDecksCount` int NOT NULL DEFAULT 0, `averageScore` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `perform` (`id` int NOT NULL AUTO_INCREMENT, `deckId` int NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `answer` (`id` int NOT NULL AUTO_INCREMENT, `answer` varchar(255) NOT NULL, `isCorrect` tinyint NOT NULL, `performId` int NULL, `deckMusicId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `deck_hashtag` ADD CONSTRAINT `FK_ff0a4a042a3e567e12e640a3ae2` FOREIGN KEY (`deckId`) REFERENCES `deck`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `deck_music` ADD CONSTRAINT `FK_136b475cef346112917d83e2566` FOREIGN KEY (`deckId`) REFERENCES `deck`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `deck_music` ADD CONSTRAINT `FK_75cf01a2e46aa32797131482dc9` FOREIGN KEY (`musicId`) REFERENCES `music`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `perform` ADD CONSTRAINT `FK_9e6b4cb8be55c34d2c6af078b9c` FOREIGN KEY (`deckId`) REFERENCES `deck`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `perform` ADD CONSTRAINT `FK_03cb9b6e5bac7e2bb3de9762ab6` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `answer` ADD CONSTRAINT `FK_b035e6640ff5edbce15d73f325b` FOREIGN KEY (`performId`) REFERENCES `perform`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `answer` ADD CONSTRAINT `FK_1d82774fd915ac07e686e3ac957` FOREIGN KEY (`deckMusicId`) REFERENCES `deck_music`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `answer` DROP FOREIGN KEY `FK_1d82774fd915ac07e686e3ac957`", undefined);
        await queryRunner.query("ALTER TABLE `answer` DROP FOREIGN KEY `FK_b035e6640ff5edbce15d73f325b`", undefined);
        await queryRunner.query("ALTER TABLE `perform` DROP FOREIGN KEY `FK_03cb9b6e5bac7e2bb3de9762ab6`", undefined);
        await queryRunner.query("ALTER TABLE `perform` DROP FOREIGN KEY `FK_9e6b4cb8be55c34d2c6af078b9c`", undefined);
        await queryRunner.query("ALTER TABLE `deck_music` DROP FOREIGN KEY `FK_75cf01a2e46aa32797131482dc9`", undefined);
        await queryRunner.query("ALTER TABLE `deck_music` DROP FOREIGN KEY `FK_136b475cef346112917d83e2566`", undefined);
        await queryRunner.query("ALTER TABLE `deck_hashtag` DROP FOREIGN KEY `FK_ff0a4a042a3e567e12e640a3ae2`", undefined);
        await queryRunner.query("DROP TABLE `answer`", undefined);
        await queryRunner.query("DROP TABLE `perform`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
        await queryRunner.query("DROP TABLE `deck`", undefined);
        await queryRunner.query("DROP TABLE `deck_music`", undefined);
        await queryRunner.query("DROP TABLE `music`", undefined);
        await queryRunner.query("DROP TABLE `deck_hashtag`", undefined);
    }

}
