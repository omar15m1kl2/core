import { MigrationInterface, QueryRunner } from "typeorm";

export class DropHasChild1710457891187 implements MigrationInterface {
    name = 'DropHasChild1710457891187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`hasChilds\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`hasChilds\` tinyint NOT NULL DEFAULT '0'`);
    }

}
