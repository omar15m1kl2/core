import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { InviteStatus } from '../../../../domain/invite-status';

@Entity({
  name: 'invite-status',
})
export class InviteStatusEntity
  extends EntityRelationalHelper
  implements InviteStatus
{
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
