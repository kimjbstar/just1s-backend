import {MigrationInterface, QueryRunner} from "typeorm";

export class setUserDefaultValue1588742851590 implements MigrationInterface {
    name = 'setUserDefaultValue1588742851590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `snsKey` `snsKey` varchar(255) NOT NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `email` `email` varchar(255) NOT NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `imgUrl` `imgUrl` varchar(255) NOT NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `name` `name` varchar(255) NOT NULL DEFAULT ''", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `name` `name` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `imgUrl` `imgUrl` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `email` `email` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `snsKey` `snsKey` varchar(255) NOT NULL", undefined);
    }

}
