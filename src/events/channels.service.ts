import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChannelsService } from 'src/channels/channels.service';
import { ChannelDeletedDto } from './dto/channel-deleted.dto';
import { EventReplyDto } from './dto/event-reply.dto';
import { Events } from './enums/events.enum';
import { ChannelCreatedDto } from './dto/channel-created.dto';
import { ChannelUpdatedDto } from './dto/channel-updated.dto';
import { WorkspaceChannelService } from 'src/workspace-channel/workspace-channel.service';
import { UsersAddedDto } from './dto/users-added.dto';
import { RoomType } from './enums/room-type.enum';

@Injectable()
export class ChannelsEventService {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly workspaceChannelService: WorkspaceChannelService,
  ) {}
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

  async channelUpdated(
    client: any,
    payload: ChannelUpdatedDto,
  ): Promise<EventReplyDto> {
    const channel = await this.channelsService.update(
      client.user,
      payload.id,
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

    client.to('channel' + payload.id).emit(Events.CHANNEL_UPDATED, channel);

    return {
      status: 'OK',
      data: { channel },
      seq_reply: payload.seq,
    };
  }

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
      seq_reply: payload.seq,
      data: {
        channel_id: payload.id,
        message: 'Channel successfully deleted',
      },
    };
  }

  async usersAdded(
    client: any,
    payload: UsersAddedDto,
  ): Promise<EventReplyDto> {
    const result = await this.workspaceChannelService.addUsersToChannel(
      client.user,
      payload.broadcast.workspace_id,
      payload.broadcast.channel_id,
      payload.data,
    );

    if (!result) {
      return {
        status: 'FAILED',
        error: {
          id: '500',
          message: 'Internal Server Error',
        },
        seq_reply: payload.seq,
      };
    }

    if (
      !(
        result instanceof NotFoundException ||
        result instanceof ForbiddenException
      )
    ) {
      const { addedUsers } = result;

      if (addedUsers.length > 0) {
        client
          .to(RoomType.Channel + payload.broadcast.channel_id)
          .emit(payload.event, addedUsers);
      }
    }

    return {
      status: 'OK',
      data: { result },
      seq_reply: payload.seq,
    };
  }
}
