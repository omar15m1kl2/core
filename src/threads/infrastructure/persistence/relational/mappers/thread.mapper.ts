import { MessageEntity } from '../../../../../messages/infrastructure/presistence/entities/message.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Thread } from '../../../../domain/thread';
import { ThreadEntity } from '../entities/thread.entity';

export class ThreadMapper {
  static toDomain(raw: ThreadEntity): Thread {
    const thread = new Thread();

    thread.id = raw.id;
    thread.participants = raw.participants;
    thread.parentMessage = raw.parentMessage;

    return thread;
  }

  static toPersistence(thread: Thread): ThreadEntity {
    const participants = thread.participants?.map((member) => {
      const participant = new UserEntity();

      participant.id = Number(member.id);

      return participant;
    });

    const parentMessage = new MessageEntity();
    parentMessage.id = Number(thread.parentMessage.id);

    const threadEntity = new ThreadEntity();
    if (thread.id) {
      threadEntity.id = thread.id;
    }

    threadEntity.participants = participants;
    threadEntity.parentMessage = parentMessage;

    return threadEntity;
  }
}
