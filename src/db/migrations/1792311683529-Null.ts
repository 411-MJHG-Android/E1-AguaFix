import { MigrationInterface, QueryRunner } from "typeorm";

export class Null1792311683529 implements MigrationInterface {
    name = 'Null1792311683529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WATER_REPORT" ALTER COLUMN "repairPhotoUrl" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WATER_REPORT" ALTER COLUMN "repairPhotoUrl" SET NOT NULL`);
    }

}
