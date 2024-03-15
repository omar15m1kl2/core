import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDraftMessageFlag1710516256164 implements MigrationInterface {
    name = 'AddDraftMessageFlag1710516256164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`draft\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`draft\``);
    }

}
