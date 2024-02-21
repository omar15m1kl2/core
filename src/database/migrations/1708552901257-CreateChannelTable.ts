import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChannelTable1708552901257 implements MigrationInterface {
    name = 'CreateChannelTable1708552901257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`channel\` ADD \`typeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`channel\` ADD CONSTRAINT \`FK_6ee7864784927f0b47d4b25af6e\` FOREIGN KEY (\`typeId\`) REFERENCES \`channel-type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`channel\` DROP FOREIGN KEY \`FK_6ee7864784927f0b47d4b25af6e\``);
        await queryRunner.query(`ALTER TABLE \`channel\` DROP COLUMN \`typeId\``);
    }

}
