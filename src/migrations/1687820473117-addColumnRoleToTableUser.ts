import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnRoleToTableUser1687820473117 implements MigrationInterface {
    name = 'AddColumnRoleToTableUser1687820473117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` enum ('USER', 'CUSTOMER', 'ADMIN') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }

}
