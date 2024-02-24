import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChannelTable1708801451813 implements MigrationInterface {
    name = 'CreateChannelTable1708801451813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`channel-type\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`channel\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`ownerId\` int NULL, \`typeId\` int NULL, \`workspaceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`channel_members_user\` (\`channelId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_c0fac7de25481dc00f252d10b6\` (\`channelId\`), INDEX \`IDX_640b1b568d70b43b1694bbd07c\` (\`userId\`), PRIMARY KEY (\`channelId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`channel\` ADD CONSTRAINT \`FK_bdfef605fedc02f3f9d60f1bc07\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`channel\` ADD CONSTRAINT \`FK_6ee7864784927f0b47d4b25af6e\` FOREIGN KEY (\`typeId\`) REFERENCES \`channel-type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`channel\` ADD CONSTRAINT \`FK_885f1a3a3369b4cfa36bfd2e83f\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`channel_members_user\` ADD CONSTRAINT \`FK_c0fac7de25481dc00f252d10b69\` FOREIGN KEY (\`channelId\`) REFERENCES \`channel\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`channel_members_user\` ADD CONSTRAINT \`FK_640b1b568d70b43b1694bbd07c1\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`channel_members_user\` DROP FOREIGN KEY \`FK_640b1b568d70b43b1694bbd07c1\``);
        await queryRunner.query(`ALTER TABLE \`channel_members_user\` DROP FOREIGN KEY \`FK_c0fac7de25481dc00f252d10b69\``);
        await queryRunner.query(`ALTER TABLE \`channel\` DROP FOREIGN KEY \`FK_885f1a3a3369b4cfa36bfd2e83f\``);
        await queryRunner.query(`ALTER TABLE \`channel\` DROP FOREIGN KEY \`FK_6ee7864784927f0b47d4b25af6e\``);
        await queryRunner.query(`ALTER TABLE \`channel\` DROP FOREIGN KEY \`FK_bdfef605fedc02f3f9d60f1bc07\``);
        await queryRunner.query(`DROP INDEX \`IDX_640b1b568d70b43b1694bbd07c\` ON \`channel_members_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_c0fac7de25481dc00f252d10b6\` ON \`channel_members_user\``);
        await queryRunner.query(`DROP TABLE \`channel_members_user\``);
        await queryRunner.query(`DROP TABLE \`channel\``);
        await queryRunner.query(`DROP TABLE \`channel-type\``);
    }

}
