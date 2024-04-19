import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInvitesTable1713205569012 implements MigrationInterface {
    name = 'AddInvitesTable1713205569012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`invite-status\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invite\` (\`id\` int NOT NULL AUTO_INCREMENT, \`invitee_email\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`senderId\` int NULL, \`workspaceId\` int NULL, \`statusId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`invite\` ADD CONSTRAINT \`FK_b8041b4f6ca5d1cbbbf97a50d22\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invite\` ADD CONSTRAINT \`FK_2cef34d2245150b9c01e1f7f53f\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invite\` ADD CONSTRAINT \`FK_65298059a35ae462f5e25198ab3\` FOREIGN KEY (\`statusId\`) REFERENCES \`invite-status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invite\` DROP FOREIGN KEY \`FK_65298059a35ae462f5e25198ab3\``);
        await queryRunner.query(`ALTER TABLE \`invite\` DROP FOREIGN KEY \`FK_2cef34d2245150b9c01e1f7f53f\``);
        await queryRunner.query(`ALTER TABLE \`invite\` DROP FOREIGN KEY \`FK_b8041b4f6ca5d1cbbbf97a50d22\``);
        await queryRunner.query(`DROP TABLE \`invite\``);
        await queryRunner.query(`DROP TABLE \`invite-status\``);
    }

}
