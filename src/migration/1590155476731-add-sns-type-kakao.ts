import { MigrationInterface, QueryRunner } from "typeorm";

export class addSnsTypeKakao1590155476731 implements MigrationInterface {
  name = "addSnsTypeKakao1590155476731";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `user` CHANGE `snsType` `snsType` enum ('EMAIL', 'FACEBOOK', 'INSTAGRAM', 'NAVER', 'KAKAO') NOT NULL DEFAULT 'EMAIL'",
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `user` CHANGE `snsType` `snsType` enum ('EMAIL', 'FACEBOOK', 'INSTAGRAM', 'NAVER') NOT NULL DEFAULT 'EMAIL'",
      undefined
    );
  }
}
