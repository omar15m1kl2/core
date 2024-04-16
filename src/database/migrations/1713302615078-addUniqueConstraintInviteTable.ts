import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraintInviteTable1713302615078 implements MigrationInterface {
    name = 'AddUniqueConstraintInviteTable1713302615078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`IDX_a5ef86edb174b83e3fac8f8c81\` ON \`invite\` (\`invitee_email\`, \`workspaceId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_e84462f4e0c250ef66410a3c9c\` ON \`invite\` (\`invitee_email\`, \`workspaceId\`, \`senderId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e84462f4e0c250ef66410a3c9c\` ON \`invite\``);
        await queryRunner.query(`DROP INDEX \`IDX_a5ef86edb174b83e3fac8f8c81\` ON \`invite\``);
    }

}
