import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMessagesTable1708643774002 implements MigrationInterface {
    name = 'CreateMessagesTable1708643774002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`workspace\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`owner\` int NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime NULL, \`updatedAt\` datetime NULL, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`bio\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`statusMessage\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`avatarUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatarUrl\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`statusMessage\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`bio\``);
        await queryRunner.query(`DROP TABLE \`workspace\``);
    }

}
