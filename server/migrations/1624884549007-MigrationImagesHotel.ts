import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationImagesHotel1624884549007 implements MigrationInterface {
    name = 'MigrationImagesHotel1624884549007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "image_path" integer NOT NULL, "hotel_id" integer NOT NULL, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "times_reserved"`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_de3605b7d4d45d88b94db3a8550" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_de3605b7d4d45d88b94db3a8550"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "times_reserved" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
