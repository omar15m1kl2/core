import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from '../../../domain/channel';
import { ChannelTypeEntity } from '../../../../channel-types/infrastructure/persistence/relational/entities/channel-type.entity';
@Entity({
  name: 'channel',
})
export class ChannelEntity extends EntityRelationalHelper implements Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: Number })
  owner: number;

  @Column({ type: String, nullable: true })
  title: string | null;

  @Column({ type: String, nullable: true })
  description: string | null;

  @ManyToOne(() => ChannelTypeEntity)
  type?: ChannelTypeEntity;

  @CreateDateColumn({ type: Date })
  createdAt: Date;

  @UpdateDateColumn({ type: Date, nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: Date, nullable: true })
  deletedAt: Date;

  @Column({ type: Number })
  workspace: number;
}
