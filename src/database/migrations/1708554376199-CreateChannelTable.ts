import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChannelTable1708554376199 implements MigrationInterface {
    name = 'CreateChannelTable1708554376199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`channel-type\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`channel\` (\`id\` int NOT NULL AUTO_INCREMENT, \`owner\` int NOT NULL, \`title\` varchar(255) NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`workspace\` int NOT NULL, \`typeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP COLUMN \`owner\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD \`owner\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`channel\` ADD CONSTRAINT \`FK_6ee7864784927f0b47d4b25af6e\` FOREIGN KEY (\`typeId\`) REFERENCES \`channel-type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`channel\` DROP FOREIGN KEY \`FK_6ee7864784927f0b47d4b25af6e\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP COLUMN \`owner\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD \`owner\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`channel\``);
        await queryRunner.query(`DROP TABLE \`channel-type\``);
    }

}
