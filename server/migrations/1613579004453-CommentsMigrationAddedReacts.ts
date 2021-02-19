import {MigrationInterface, QueryRunner} from "typeorm";

export class CommentsMigrationAddedReacts1613579004453 implements MigrationInterface {
    name = 'CommentsMigrationAddedReacts1613579004453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "thumb_react" integer`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "party_react" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "party_react"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "thumb_react"`);
    }

}
