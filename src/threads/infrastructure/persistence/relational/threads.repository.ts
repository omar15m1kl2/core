import { ThreadParticipant } from '../../../domain/thread';

export abstract class ThreadRepository {
  abstract create(
    data: Omit<
      ThreadParticipant,
      | 'id'
      | 'participants'
      | 'parentMessage'
      | 'createdAt'
      | 'updatedAt'
      | 'deletedAt'
    >,
  ): Promise<ThreadParticipant>;
}
