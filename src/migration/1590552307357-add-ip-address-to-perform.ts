import {MigrationInterface, QueryRunner} from "typeorm";

export class addIpAddressToPerform1590552307357 implements MigrationInterface {
    name = 'addIpAddressToPerform1590552307357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `perform` ADD `ipAddress` varchar(255) NOT NULL DEFAULT ''", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `perform` DROP COLUMN `ipAddress`", undefined);
    }

}
