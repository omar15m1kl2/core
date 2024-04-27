import { Channel } from 'src/channels/domain/channel';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { DeepPartial } from 'typeorm';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import {
  FilterChannelDto,
  SortChannelDto,
} from 'src/channels/dto/query-channel.dto';
import { User } from 'src/users/domain/user';

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

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterChannelDto | null;
    sortOptions?: SortChannelDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Channel[]>;

  abstract update(
    id: Channel['id'],
    payload: DeepPartial<Channel>,
  ): Promise<Channel>;

  abstract addUser(id: Channel['id'], user: User): Promise<void>;

  abstract checkUserMembership(
    channelId: Channel['id'],
    memberId: User['id'],
  ): Promise<NullableType<Channel>>;

  abstract softDelete(id: Channel['id']): Promise<void>;
}
