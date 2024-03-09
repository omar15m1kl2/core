import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ThreadParticipant } from '../../../../domain/thread-participant';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { MessageEntity } from '../../../../../messages/infrastructure/presistence/entities/message.entity';

@Entity({
  name: 'thread_participant',
})
export class ThreadParticipantEntity
  extends EntityRelationalHelper
  implements ThreadParticipant
{
  @PrimaryColumn()
  participantId: number;

  @PrimaryColumn()
  parentMessageId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'participantId', referencedColumnName: 'id' })
  participant: UserEntity;

  @ManyToOne(() => MessageEntity)
  @JoinColumn({ name: 'parentMessageId', referencedColumnName: 'id' })
  parentMessage: MessageEntity;
}
