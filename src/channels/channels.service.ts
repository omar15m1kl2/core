import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ChannelRepository } from './infrastructure/persistence/channel.repository';
import { User } from 'src/users/domain/user';
import { CreateChannelDto } from './dto/create-channel.dto';
import { Channel } from './domain/channel';

@Injectable()
export class ChannelsService {
  constructor(private readonly ChannelRepostory: ChannelRepository) {}

  async createChannel(user: User, createChannelDto: CreateChannelDto) {
    createChannelDto.members
      ? createChannelDto.members.push(user)
      : (createChannelDto.members = [user]);

    const clonedPayload = {
      owner: user,
      ...createChannelDto,
    };

    return this.ChannelRepostory.create(clonedPayload);
  }

  async getChannelById(user: User, id: Channel['id']) {
    const channel = await this.ChannelRepostory.findOne({ id });

    if (!channel) {
      throw new Error('Channel not found');
    }

    if (!channel.members.find((member) => member.id === user.id)) {
      throw new UnauthorizedException();
    }

    return channel;
  }
}
