import {MigrationInterface, QueryRunner} from "typeorm";

export class addKeyToMusic1588781417143 implements MigrationInterface {
    name = 'addKeyToMusic1588781417143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `music` ADD `key` varchar(255) NOT NULL DEFAULT ''", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `music` DROP COLUMN `key`", undefined);
    }

}
