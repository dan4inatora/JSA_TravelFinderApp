import {MigrationInterface, QueryRunner} from "typeorm";

export class CommentReactsMigration1613599720266 implements MigrationInterface {
    name = 'CommentReactsMigration1613599720266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment_reacts" ("id" SERIAL NOT NULL, "thumb_react" integer, "party_react" integer, "user_id" integer NOT NULL, "comment_id" integer NOT NULL, CONSTRAINT "PK_d32cd728c4b2fede0d46afb5bac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment_reacts" ADD CONSTRAINT "FK_6a0b6dde244d241d6764bb8c43c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_reacts" ADD CONSTRAINT "FK_35039676edbb3167e6981449b93" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_reacts" DROP CONSTRAINT "FK_35039676edbb3167e6981449b93"`);
        await queryRunner.query(`ALTER TABLE "comment_reacts" DROP CONSTRAINT "FK_6a0b6dde244d241d6764bb8c43c"`);
        await queryRunner.query(`DROP TABLE "comment_reacts"`);
    }

}
