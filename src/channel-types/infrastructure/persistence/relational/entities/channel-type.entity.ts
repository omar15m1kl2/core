import { ChannelType } from '../../../../domain/channel-type';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'channel-type',
})
export class ChannelTypeEntity
  extends EntityRelationalHelper
  implements ChannelType
{
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
