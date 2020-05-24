import {MigrationInterface, QueryRunner} from "typeorm";

export class addRepImgUrlToDeck1590299911196 implements MigrationInterface {
    name = 'addRepImgUrlToDeck1590299911196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `deck` ADD `repImgUrl` varchar(255) NOT NULL DEFAULT ''", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `deck` DROP COLUMN `repImgUrl`", undefined);
    }

}
