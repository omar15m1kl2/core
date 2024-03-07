import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateThreadTable1709831267670 implements MigrationInterface {
    name = 'CreateThreadTable1709831267670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`thread\` (\`id\` int NOT NULL AUTO_INCREMENT, \`participantsId\` int NULL, \`parentMessageId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`thread\` ADD CONSTRAINT \`FK_02722f58e0cae1fcf42c52dd2fb\` FOREIGN KEY (\`participantsId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`thread\` ADD CONSTRAINT \`FK_eacd4be08a74b51d41ca684b102\` FOREIGN KEY (\`parentMessageId\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`thread\` DROP FOREIGN KEY \`FK_eacd4be08a74b51d41ca684b102\``);
        await queryRunner.query(`ALTER TABLE \`thread\` DROP FOREIGN KEY \`FK_02722f58e0cae1fcf42c52dd2fb\``);
        await queryRunner.query(`DROP TABLE \`thread\``);
    }

}
