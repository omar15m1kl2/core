import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhotoColWorkspace1713646688515 implements MigrationInterface {
    name = 'AddPhotoColWorkspace1713646688515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`avatarUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD \`photoId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD CONSTRAINT \`FK_0d58141a87824f1d8af0ebd4e40\` FOREIGN KEY (\`photoId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP FOREIGN KEY \`FK_0d58141a87824f1d8af0ebd4e40\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP COLUMN \`photoId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatarUrl\``);
    }

}
