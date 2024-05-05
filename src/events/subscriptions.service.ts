import { Injectable } from '@nestjs/common';
import { EventReplyDto } from './dto/event-reply.dto';
import { SubscriptionDto } from './dto/subscribe.dto';
import { RoomType } from './enums/room-type.enum';
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
    console.log(
      'number of users in room',
      client.adapter.rooms.get(payload.data.room_id),
    );

    return {
      status: 'OK',
      data: {
        room_id: payload.data.room_id,
        message: successMessage,
      },
      seq_reply: payload.seq,
    };
  }

  async subscribe(
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
}
