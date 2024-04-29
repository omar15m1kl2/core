import { Injectable } from '@nestjs/common';
import { EventReplyDto } from './dto/event-reply.dto';
import { SubscriptionDto } from './dto/subscribe.dto';
import { RoomType } from './enums/room-type.enum';
import { Events } from './enums/events.enum';
import { ChannelDeletedDto } from './dto/channel-deleted.dto';
import { ChannelsService } from 'src/channels/channels.service';
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@Injectable()
export class SubscriptionEventsService {
  constructor(
    private readonly workspacesService: WorkspacesService,
    private readonly channelsService: ChannelsService,
  ) {}
  private async handleSubscription(
    client: any,
    payload: SubscriptionDto,
    action: 'join' | 'leave',
    successMessage: string,
    service?: any,
  ): Promise<EventReplyDto> {
    const entity = await service?.checkUserMembership(
      payload.data.room_id,
      client.user.id,
    );

    if (!entity) {
      return {
        status: 'FAILED',
        error: {
          id: '404',
          message: 'Forbidden',
        },
        seq_reply: payload.seq,
      };
    }

    payload.data.room_id = payload.data.room_type + payload.data.room_id;
    client[action](payload.data.room_id);
    // console.log(
    //   'number of users in room',
    //   client.adapter.rooms.get(payload.data.room_id),
    // );

    return {
      status: 'OK',
      data: {
        room_id: payload.data.room_id,
        message: successMessage,
      },
      seq_reply: payload.seq,
    };
  }

  async handleSubscribe(
    client: any,
    payload: SubscriptionDto,
  ): Promise<EventReplyDto> {
    const handlers = {
      [RoomType.Workspace]: async () =>
        this.handleSubscription(
          client,
          payload,
          'join',
          'Subscribed',
          this.workspacesService,
        ),
      [RoomType.Channel]: async () =>
        this.handleSubscription(
          client,
          payload,
          'join',
          'Subscribed',
          this.channelsService,
        ),
      [RoomType.User]: async () =>
        this.handleSubscription(client, payload, 'join', 'Subscribed', null),
    };

    const handler = handlers[payload.data.room_type];
    if (!handler) {
      throw new Error('Invalid room type');
    }

    return handler();
  }

  async unsubscribe(
    client: any,
    payload: SubscriptionDto,
  ): Promise<EventReplyDto> {
    const handlers = {
      [RoomType.Workspace]: async () =>
        this.handleSubscription(
          client,
          payload,
          'leave',
          'Unsubscribed',
          this.workspacesService,
        ),
      [RoomType.Channel]: async () =>
        this.handleSubscription(
          client,
          payload,
          'leave',
          'Unsubscribed',
          this.channelsService,
        ),
      [RoomType.User]: async () =>
        this.handleSubscription(client, payload, 'leave', 'Unsubscribed', null),
    };

    const handler = handlers[payload.data.room_type];
    if (!handler) {
      throw new Error('Invalid room type');
    }

    return handler();
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
      data: {
        channel_id: payload.id,
        message: 'Channel successfully deleted',
      },
      seq_reply: payload.seq,
    };
  }
}
