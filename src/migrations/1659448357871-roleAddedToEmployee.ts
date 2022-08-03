import {MigrationInterface, QueryRunner} from "typeorm";

export class roleAddedToEmployee1659448357871 implements MigrationInterface {
    name = 'roleAddedToEmployee1659448357871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
    }

}
