import {MigrationInterface, QueryRunner} from "typeorm";

export class addDeckUser1588742235812 implements MigrationInterface {
    name = 'addDeckUser1588742235812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `deck` ADD `userId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `deck` ADD CONSTRAINT `FK_09e8a376bab70b9737c839b2e24` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `deck` DROP FOREIGN KEY `FK_09e8a376bab70b9737c839b2e24`", undefined);
        await queryRunner.query("ALTER TABLE `deck` DROP COLUMN `userId`", undefined);
    }

}
