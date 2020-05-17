import {MigrationInterface, QueryRunner} from "typeorm";

export class addRolePwToUser1589686393197 implements MigrationInterface {
    name = 'addRolePwToUser1589686393197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `role` enum ('NORMAL', 'STAFF', 'MASTER') NOT NULL DEFAULT 'NORMAL'", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `pw` varchar(255) NOT NULL DEFAULT ''", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `pw`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `role`", undefined);
    }

}
