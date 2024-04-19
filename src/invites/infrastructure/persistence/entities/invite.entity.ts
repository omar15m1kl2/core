import { InviteStatusEntity } from 'src/inviteStatuses/infrastructure/persistence/relational/entities/invite-status.entity';
import { Invite } from 'src/invites/domain/invite';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { WorkspaceEntity } from 'src/workspaces/infrastructure/persistence/entities/workspace.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'invite',
})
@Unique(['invitee_email', 'workspace', 'sender'])
@Index(['invitee_email', 'workspace'])
export class InviteEntity extends EntityRelationalHelper implements Invite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  sender: UserEntity;

  @Column({ type: String })
  invitee_email: string;

  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.invites)
  workspace: WorkspaceEntity;

  @ManyToOne(() => InviteStatusEntity, {
    eager: true,
  })
  status: InviteStatusEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
