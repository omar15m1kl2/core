import { Injectable } from '@nestjs/common';
import { ChannelsService } from 'src/channels/channels.service';
import { ChannelDeletedDto } from './dto/channel-deleted.dto';
import { EventReplyDto } from './dto/event-reply.dto';
import { Events } from './enums/events.enum';

@Injectable()
export class ChannelsEventsService {
  constructor(private readonly channelsService: ChannelsService) {}

  async channelDeleted(
    client: any,
    payload: ChannelDeletedDto,
  ): Promise<EventReplyDto> {
    await this.channelsService.softDelete(client.user, payload.id);

    const channelDeleted = {
      id: payload.id,
      workspaceId: payload.broadcast.workspace_id,
    };

    client
      .to('channel' + payload.id)
      .emit(Events.CHANNEL_DELETED, channelDeleted);

    return {
      status: 'OK',
      data: {
        channel_id: payload.id,
        message: 'Channel successfully deleted',
      },
      seq_reply: payload.seq,
    };
  }
}
