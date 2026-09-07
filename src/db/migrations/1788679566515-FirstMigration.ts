import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1788679566515 implements MigrationInterface {
    name = 'FirstMigration1788679566515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Water_Report" ("id" SERIAL NOT NULL, "address" character varying(255) NOT NULL, "description" character varying NOT NULL, "severity" character varying NOT NULL, "reporterPhone" character varying NOT NULL, "isResolved" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d63226d1393658efc0bd1271afa" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Water_Report"`);
    }

}
