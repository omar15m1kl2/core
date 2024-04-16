import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraintInviteTable1713300834030 implements MigrationInterface {
    name = 'AddUniqueConstraintInviteTable1713300834030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`IDX_INVITEE_EMAIL\` ON \`invite\` (\`invitee_email\`, \`workspaceId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`UQ_INVITEE_EMAIL_WORKSPACE_SENDER\` ON \`invite\` (\`invitee_email\`, \`workspaceId\`, \`senderId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_INVITEE_EMAIL_WORKSPACE_SENDER\` ON \`invite\``);
        await queryRunner.query(`DROP INDEX \`IDX_INVITEE_EMAIL\` ON \`invite\``);
    }

}
