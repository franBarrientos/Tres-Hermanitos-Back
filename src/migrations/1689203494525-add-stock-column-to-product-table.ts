import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStockColumnToProductTable1689203494525 implements MigrationInterface {
    name = 'AddStockColumnToProductTable1689203494525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`stock\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`stock\``);
    }

}
