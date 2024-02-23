import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChannelType1708729184388 implements MigrationInterface {
    name = 'CreateChannelType1708729184388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`channel_members_user\` (\`channelId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_c0fac7de25481dc00f252d10b6\` (\`channelId\`), INDEX \`IDX_640b1b568d70b43b1694bbd07c\` (\`userId\`), PRIMARY KEY (\`channelId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`channel_members_user\` ADD CONSTRAINT \`FK_c0fac7de25481dc00f252d10b69\` FOREIGN KEY (\`channelId\`) REFERENCES \`channel\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`channel_members_user\` ADD CONSTRAINT \`FK_640b1b568d70b43b1694bbd07c1\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`channel_members_user\` DROP FOREIGN KEY \`FK_640b1b568d70b43b1694bbd07c1\``);
        await queryRunner.query(`ALTER TABLE \`channel_members_user\` DROP FOREIGN KEY \`FK_c0fac7de25481dc00f252d10b69\``);
        await queryRunner.query(`DROP INDEX \`IDX_640b1b568d70b43b1694bbd07c\` ON \`channel_members_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_c0fac7de25481dc00f252d10b6\` ON \`channel_members_user\``);
        await queryRunner.query(`DROP TABLE \`channel_members_user\``);
    }

}
