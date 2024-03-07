import { MessageEntity } from 'src/messages/infrastructure/presistence/entities/message.entity';
import { Thread } from 'src/threads/domain/thread';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
