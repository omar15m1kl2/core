import { Injectable } from '@nestjs/common';
import { ChannelCreatedDto } from './dto/channel-created.dto';
import { EventReplyDto } from './dto/event-reply.dto';
import { Events } from './enums/events.enum';
import { ChannelsService } from 'src/channels/channels.service';

@Injectable()
export class ChannelsEventService {
  constructor(private readonly channelsService: ChannelsService) {}
  async channelCreated(
    client: any,
    payload: ChannelCreatedDto,
  ): Promise<EventReplyDto> {
    const channel = await this.channelsService.createChannel(
      client.user,
      payload.data,
    );

    if (!channel) {
      return {
        status: 'FAILED',
        error: {
          id: '500',
          message: 'Internal Server Error',
        },
        seq_reply: payload.seq,
      };
    }

    client.to('channel' + channel.id).emit(Events.CHANNEL_CREATED, channel);

    return {
      status: 'OK',
      data: { channel },
      seq_reply: payload.seq,
    };
  }
}
