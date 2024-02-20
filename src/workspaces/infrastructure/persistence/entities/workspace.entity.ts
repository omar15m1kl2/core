import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';

@Entity({
  name: 'workspace',
})
export class WorkspaceEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  title: string | null;

  @Column({ type: String })
  owner: string | null;

  @Column({ type: String, nullable: true })
  description: string | null;

  @Column({ type: Date, nullable: true })
  createdAt: Date;

  @Column({ type: Date, nullable: true })
  updatedAt: Date;

  @Column({ type: Date, nullable: true })
  deletedAt: Date;
}
