import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from '../domain/messages';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { WorkspaceEntity } from 'src/workspaces/infrastructure/persistence/entities/workspace.entity';

export class MessageEntity extends EntityRelationalHelper implements Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  content: string;

  @Column({ type: Number })
  @ManyToOne(() => UserEntity)
  senderId: UserEntity;

  @Column({ type: Number })
  // @ManyToOne(() => ChannelEntity)
  channelId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ type: Number })
  @ManyToOne(() => WorkspaceEntity)
  workspaceId: WorkspaceEntity;

  @Column({ type: Number, nullable: true })
  @ManyToOne(() => MessageEntity, { nullable: true })
  parentMessageId: MessageEntity;
}
