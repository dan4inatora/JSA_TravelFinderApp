import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationHotelId1624997274023 implements MigrationInterface {
    name = 'MigrationHotelId1624997274023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" ADD "hotels_hotel_identifier" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "hotels_hotel_identifier"`);
    }

}
