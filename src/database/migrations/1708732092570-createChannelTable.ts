import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChannelTable1708732092570 implements MigrationInterface {
    name = 'CreateChannelTable1708732092570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`channel\` DROP COLUMN \`owner\``);
        await queryRunner.query(`ALTER TABLE \`channel\` DROP COLUMN \`workspace\``);
        await queryRunner.query(`ALTER TABLE \`channel\` ADD \`ownerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`channel\` ADD \`workspaceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`channel\` CHANGE \`title\` \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`channel\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`channel\` ADD CONSTRAINT \`FK_bdfef605fedc02f3f9d60f1bc07\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`channel\` ADD CONSTRAINT \`FK_885f1a3a3369b4cfa36bfd2e83f\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`channel\` DROP FOREIGN KEY \`FK_885f1a3a3369b4cfa36bfd2e83f\``);
        await queryRunner.query(`ALTER TABLE \`channel\` DROP FOREIGN KEY \`FK_bdfef605fedc02f3f9d60f1bc07\``);
        await queryRunner.query(`ALTER TABLE \`channel\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`channel\` CHANGE \`title\` \`title\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`channel\` DROP COLUMN \`workspaceId\``);
        await queryRunner.query(`ALTER TABLE \`channel\` DROP COLUMN \`ownerId\``);
        await queryRunner.query(`ALTER TABLE \`channel\` ADD \`workspace\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`channel\` ADD \`owner\` int NOT NULL`);
    }

}
