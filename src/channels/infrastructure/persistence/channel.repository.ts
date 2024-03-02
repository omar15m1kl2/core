import { Channel } from 'src/channels/domain/channel';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Message } from '../../../messages/domain/messages';

export abstract class ChannelRepository {
  abstract create(
    data: Omit<
      Channel,
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'owner' | 'messages'
    >,
  ): Promise<Channel>;

  abstract findOne(
    fields: EntityCondition<Channel>,
  ): Promise<NullableType<Channel>>;

  abstract findMessagesWithPagination(
    id: Channel['id'],
    paginationOptions: IPaginationOptions,
  ): Promise<Message[]>;

  abstract softDelete(id: Channel['id']): Promise<void>;
}
