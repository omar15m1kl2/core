import { MigrationInterface, QueryRunner } from "typeorm";

export class DropAvatarColumn1713644842801 implements MigrationInterface {
    name = 'DropAvatarColumn1713644842801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatarUrl\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`avatarUrl\` varchar(255) NULL`);
    }

}
