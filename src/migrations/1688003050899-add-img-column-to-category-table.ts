import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImgColumnToCategoryTable1688003050899 implements MigrationInterface {
    name = 'AddImgColumnToCategoryTable1688003050899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`img\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`img\``);
    }

}
