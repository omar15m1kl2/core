import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Workspace } from '../../../domain/workspace';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'workspace',
})
export class WorkspaceEntity
  extends EntityRelationalHelper
  implements Workspace
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  title: string | null;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @Index()
  owner: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.workspaces)
  @JoinTable()
  members: UserEntity[];

  @Column({ type: String, nullable: true })
  description: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
