import {MigrationInterface, QueryRunner} from "typeorm";

export class addTimestampField1588925231512 implements MigrationInterface {
    name = 'addTimestampField1588925231512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `deck_hashtag` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `deck_hashtag` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `music` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `music` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `deck_music` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `deck_music` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `deck` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `deck` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `perform` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `perform` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `answer` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `answer` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `answer` DROP COLUMN `updatedAt`", undefined);
        await queryRunner.query("ALTER TABLE `answer` DROP COLUMN `createdAt`", undefined);
        await queryRunner.query("ALTER TABLE `perform` DROP COLUMN `updatedAt`", undefined);
        await queryRunner.query("ALTER TABLE `perform` DROP COLUMN `createdAt`", undefined);
        await queryRunner.query("ALTER TABLE `deck` DROP COLUMN `updatedAt`", undefined);
        await queryRunner.query("ALTER TABLE `deck` DROP COLUMN `createdAt`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `updatedAt`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `createdAt`", undefined);
        await queryRunner.query("ALTER TABLE `deck_music` DROP COLUMN `updatedAt`", undefined);
        await queryRunner.query("ALTER TABLE `deck_music` DROP COLUMN `createdAt`", undefined);
        await queryRunner.query("ALTER TABLE `music` DROP COLUMN `updatedAt`", undefined);
        await queryRunner.query("ALTER TABLE `music` DROP COLUMN `createdAt`", undefined);
        await queryRunner.query("ALTER TABLE `deck_hashtag` DROP COLUMN `updatedAt`", undefined);
        await queryRunner.query("ALTER TABLE `deck_hashtag` DROP COLUMN `createdAt`", undefined);
    }

}
