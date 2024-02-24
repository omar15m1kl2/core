import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMessagTable1708811574502 implements MigrationInterface {
    name = 'CreateMessagTable1708811574502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`senderId\` int NULL, \`channelId\` int NULL, \`workspaceId\` int NULL, \`parentMessageId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_bc096b4e18b1f9508197cd98066\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_5fdbbcb32afcea663c2bea2954f\` FOREIGN KEY (\`channelId\`) REFERENCES \`channel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_f35ba7c0fb5c8f767650662d8c0\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_575b24e003b8881e64fa53cd16d\` FOREIGN KEY (\`parentMessageId\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_575b24e003b8881e64fa53cd16d\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_f35ba7c0fb5c8f767650662d8c0\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_5fdbbcb32afcea663c2bea2954f\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_bc096b4e18b1f9508197cd98066\``);
        await queryRunner.query(`DROP TABLE \`message\``);
    }

}
