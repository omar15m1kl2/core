import { EntityCondition } from '../../../../utils/types/entity-condition.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import { Thread } from '../../../domain/thread';

export abstract class ThreadRepository {
  abstract create(
    data: Omit<
      Thread,
      | 'id'
      | 'participants'
      | 'parentMessage'
      | 'createdAt'
      | 'updatedAt'
      | 'deletedAt'
    >,
  ): Promise<Thread>;

  abstract findManyWithPagination(
    userId: Thread['id'],
    paginationOptions: IPaginationOptions,
  ): Promise<Thread[]>;

  abstract findOne(
    fields: EntityCondition<Thread>,
  ): Promise<NullableType<Thread>>;

  abstract softDelete(id: Thread['id']): Promise<void>;
}
