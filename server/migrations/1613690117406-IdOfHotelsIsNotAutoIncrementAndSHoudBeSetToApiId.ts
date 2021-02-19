import {MigrationInterface, QueryRunner} from "typeorm";

export class IdOfHotelsIsNotAutoIncrementAndSHoudBeSetToApiId1613690117406 implements MigrationInterface {
    name = 'IdOfHotelsIsNotAutoIncrementAndSHoudBeSetToApiId1613690117406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "thumb_react"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "party_react"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_2c6e72e2f8e12a886854df5b6b5"`);
        await queryRunner.query(`COMMENT ON COLUMN "hotels"."id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "hotels" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "hotels_id_seq"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_2c6e72e2f8e12a886854df5b6b5" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_2c6e72e2f8e12a886854df5b6b5"`);
        await queryRunner.query(`CREATE SEQUENCE "hotels_id_seq" OWNED BY "hotels"."id"`);
        await queryRunner.query(`ALTER TABLE "hotels" ALTER COLUMN "id" SET DEFAULT nextval('hotels_id_seq')`);
        await queryRunner.query(`COMMENT ON COLUMN "hotels"."id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_2c6e72e2f8e12a886854df5b6b5" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "party_react" integer`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "thumb_react" integer`);
    }

}
