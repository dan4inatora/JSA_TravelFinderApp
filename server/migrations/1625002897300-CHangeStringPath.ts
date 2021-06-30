import {MigrationInterface, QueryRunner} from "typeorm";

export class CHangeStringPath1625002897300 implements MigrationInterface {
    name = 'CHangeStringPath1625002897300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "image_path"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "image_path" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "image_path"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "image_path" integer NOT NULL`);
    }

}
