import {MigrationInterface, QueryRunner} from "typeorm";

export class fourthmigration1659442563464 implements MigrationInterface {
    name = 'fourthmigration1659442563464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying NOT NULL DEFAULT '5'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
