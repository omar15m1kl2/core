import { Channel } from 'src/channels/domain/channel';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { DeepPartial } from 'typeorm';

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

  abstract update(
    id: Channel['id'],
    payload: DeepPartial<Channel>,
  ): Promise<Channel>;

  abstract softDelete(id: Channel['id']): Promise<void>;
}
