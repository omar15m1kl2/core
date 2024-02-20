import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Workspace } from '../../../domain/workspace';

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

  @Column({ type: Number })
  owner: number;

  @Column({ type: String, nullable: true })
  description: string | null;

  @Column({ type: Date, nullable: true })
  createdAt: Date;

  @Column({ type: Date, nullable: true })
  updatedAt: Date;

  @Column({ type: Date, nullable: true })
  deletedAt: Date;
}
