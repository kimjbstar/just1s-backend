import {MigrationInterface, QueryRunner} from "typeorm";

export class setDefaultValueToUserRefreshToken1595173134674 implements MigrationInterface {
    name = 'setDefaultValueToUserRefreshToken1595173134674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `refreshToken` `refreshToken` varchar(255) NOT NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `refreshTokenExpiredAt` `refreshTokenExpiredAt` datetime(6) NULL DEFAULT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `refreshTokenExpiredAt` `refreshTokenExpiredAt` datetime(6) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `refreshToken` `refreshToken` varchar(255) NOT NULL", undefined);
    }

}
