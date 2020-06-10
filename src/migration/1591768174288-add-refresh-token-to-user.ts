import {MigrationInterface, QueryRunner} from "typeorm";

export class addRefreshTokenToUser1591768174288 implements MigrationInterface {
    name = 'addRefreshTokenToUser1591768174288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `refreshToken` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `refreshTokenExpiredAt` datetime(6) NULL DEFAULT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `refreshTokenExpiredAt`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `refreshToken`", undefined);
    }

}
