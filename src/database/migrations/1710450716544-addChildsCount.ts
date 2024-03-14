import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChildsCount1710450716544 implements MigrationInterface {
    name = 'AddChildsCount1710450716544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`thread_participants_user\` DROP FOREIGN KEY \`FK_5505bbc980e9fb593f87fe03e5e\``);
        await queryRunner.query(`ALTER TABLE \`thread_participants_user\` DROP FOREIGN KEY \`FK_64fae0e415e263705f1cc6634e6\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`hasChilds\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`childsCount\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`thread_participants_user\` ADD CONSTRAINT \`FK_5505bbc980e9fb593f87fe03e5e\` FOREIGN KEY (\`parentMessageId\`) REFERENCES \`message\`(\`parentMessageId\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`thread_participants_user\` ADD CONSTRAINT \`FK_64fae0e415e263705f1cc6634e6\` FOREIGN KEY (\`participantId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`thread_participants_user\` DROP FOREIGN KEY \`FK_64fae0e415e263705f1cc6634e6\``);
        await queryRunner.query(`ALTER TABLE \`thread_participants_user\` DROP FOREIGN KEY \`FK_5505bbc980e9fb593f87fe03e5e\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`childsCount\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`hasChilds\``);
        await queryRunner.query(`ALTER TABLE \`thread_participants_user\` ADD CONSTRAINT \`FK_64fae0e415e263705f1cc6634e6\` FOREIGN KEY (\`participantId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`thread_participants_user\` ADD CONSTRAINT \`FK_5505bbc980e9fb593f87fe03e5e\` FOREIGN KEY (\`parentMessageId\`) REFERENCES \`message\`(\`parentMessageId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
