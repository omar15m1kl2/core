import { Injectable } from '@nestjs/common';
import { ChannelsService } from 'src/channels/channels.service';
import { ChannelDeletedDto } from './dto/channel-deleted.dto';
import { EventReplyDto } from './dto/event-reply.dto';
import { ChannelCreatedDto } from './dto/channel-created.dto';
import { ChannelUpdatedDto } from './dto/channel-updated.dto';
import { WorkspaceChannelService } from 'src/workspace-channel/workspace-channel.service';
import { UsersAddedToChannelDto } from './dto/users-added-to-channel.dto';
import { RoomType } from './enums/room-type.enum';
import { TypingEventDto } from './dto/typing.dto';

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

    client.to(RoomType.Channel + channel.id).emit(payload.event, channel);

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

    client.to(RoomType.Channel + payload.id).emit(payload.event, channel);

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
      .to(RoomType.Channel + payload.id)
      .emit(payload.event, channelDeleted);

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
    payload: UsersAddedToChannelDto,
  ): Promise<EventReplyDto> {
    const result = await this.workspaceChannelService.addUsersToChannel(
      client.user,
      payload.workspace_id,
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

    const { addedUsers } = result;

    if (addedUsers.length > 0) {
      client
        .to(RoomType.Channel + payload.broadcast.channel_id)
        .emit(payload.event, addedUsers);
    }

    return {
      status: 'OK',
      data: { result },
      seq_reply: payload.seq,
    };
  }

  async typing(client: any, payload: TypingEventDto): Promise<EventReplyDto> {
    client
      .to(RoomType.Channel + payload.broadcast.channel_id)
      .emit(payload.event, {
        typing: payload.typing,
        user_id: client.user.id,
        channel_id: payload.broadcast.channel_id,
      });

    return Promise.resolve({
      status: 'OK',
      seq_reply: payload.seq,
    });
  }
}
