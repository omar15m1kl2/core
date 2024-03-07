import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Thread } from '../../../../domain/thread';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { MessageEntity } from '../../../../../messages/infrastructure/presistence/entities/message.entity';

@Entity({
  name: 'thread',
})
export class ThreadEntity extends EntityRelationalHelper implements Thread {
  @PrimaryGeneratedColumn()
  id: number | string;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  participants: UserEntity[];

  @ManyToOne(() => MessageEntity, {
    eager: true,
  })
  parentMessage: MessageEntity;
}
