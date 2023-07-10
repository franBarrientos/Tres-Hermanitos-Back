import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImgColumnToProductTable1688000449342 implements MigrationInterface {
    name = 'AddImgColumnToProductTable1688000449342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`img\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`img\``);
    }

}
