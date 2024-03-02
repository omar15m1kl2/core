import { Channel } from 'src/channels/domain/channel';

export abstract class ChannelRepository {
  abstract create(
    data: Omit<
      Channel,
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'owner'
    >,
  ): Promise<Channel>;
}
