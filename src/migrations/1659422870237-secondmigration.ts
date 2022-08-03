import {MigrationInterface, QueryRunner} from "typeorm";

export class secondmigration1659422870237 implements MigrationInterface {
    name = 'secondmigration1659422870237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer NOT NULL DEFAULT '5'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
    }

}
