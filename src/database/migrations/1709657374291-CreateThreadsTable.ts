import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateThreadsTable1709657374291 implements MigrationInterface {
    name = 'CreateThreadsTable1709657374291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`thread\` (\`id\` int NOT NULL AUTO_INCREMENT, \`participateId\` int NULL, \`parentMessageId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`thread\` ADD CONSTRAINT \`FK_530b135a89d0bdbf7029ce21cfc\` FOREIGN KEY (\`participateId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`thread\` ADD CONSTRAINT \`FK_eacd4be08a74b51d41ca684b102\` FOREIGN KEY (\`parentMessageId\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`thread\` DROP FOREIGN KEY \`FK_eacd4be08a74b51d41ca684b102\``);
        await queryRunner.query(`ALTER TABLE \`thread\` DROP FOREIGN KEY \`FK_530b135a89d0bdbf7029ce21cfc\``);
        await queryRunner.query(`DROP TABLE \`thread\``);
    }

}
