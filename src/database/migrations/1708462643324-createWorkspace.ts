import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkspace1708462643324 implements MigrationInterface {
    name = 'CreateWorkspace1708462643324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`workspace\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`owner\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime NULL, \`updatedAt\` datetime NULL, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`workspace\``);
    }

}
