import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserWorkspaceRelationship1708530117129 implements MigrationInterface {
    name = 'AddUserWorkspaceRelationship1708530117129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`workspace_members_user\` (\`workspaceId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_e2f1c37290df3031f715f1e7b8\` (\`workspaceId\`), INDEX \`IDX_ca7791a2d586bc444a938a24b0\` (\`userId\`), PRIMARY KEY (\`workspaceId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP COLUMN \`owner\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD \`ownerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`workspace\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`workspace\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`workspace\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_51f2194e4a415202512807d2f6\` ON \`workspace\` (\`ownerId\`)`);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD CONSTRAINT \`FK_51f2194e4a415202512807d2f63\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace_members_user\` ADD CONSTRAINT \`FK_e2f1c37290df3031f715f1e7b8f\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`workspace_members_user\` ADD CONSTRAINT \`FK_ca7791a2d586bc444a938a24b0b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workspace_members_user\` DROP FOREIGN KEY \`FK_ca7791a2d586bc444a938a24b0b\``);
        await queryRunner.query(`ALTER TABLE \`workspace_members_user\` DROP FOREIGN KEY \`FK_e2f1c37290df3031f715f1e7b8f\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP FOREIGN KEY \`FK_51f2194e4a415202512807d2f63\``);
        await queryRunner.query(`DROP INDEX \`IDX_51f2194e4a415202512807d2f6\` ON \`workspace\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` CHANGE \`deletedAt\` \`deletedAt\` datetime(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`workspace\` CHANGE \`updatedAt\` \`updatedAt\` datetime(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`workspace\` CHANGE \`createdAt\` \`createdAt\` datetime(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP COLUMN \`ownerId\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD \`owner\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_ca7791a2d586bc444a938a24b0\` ON \`workspace_members_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e2f1c37290df3031f715f1e7b8\` ON \`workspace_members_user\``);
        await queryRunner.query(`DROP TABLE \`workspace_members_user\``);
    }

}
