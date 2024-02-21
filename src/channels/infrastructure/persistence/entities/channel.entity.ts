import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from '../../../domain/channel';
import { ChannelType } from 'src/channel-types/domain/channel-type';

@Entity({
  name: 'channel',
})
export class ChannelEntity extends EntityRelationalHelper implements Channel {
  @PrimaryGeneratedColumn()
  id: number | string;

  @Column({ type: String })
  owner: number | string;

  @Column({ type: String, nullable: true })
  title: string | null;

  @Column({ type: String, nullable: true })
  description: string | null;

  @Column()
  type: ChannelType;

  @CreateDateColumn({ type: Date })
  createdAt: Date;

  @UpdateDateColumn({ type: Date, nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: Date, nullable: true })
  deletedAt: Date;

  @Column({ type: String })
  workspace: number | string;
}
