import { Injectable } from '@nestjs/common';
import { WorkspacesService } from 'src/workspaces/workspaces.service';
import { ChannelsService } from 'src/channels/channels.service';
import { MessagesService } from 'src/messages/messages.service';
import { SubscriptionDto } from './dto/subscribe.dto';
import { EventReplyDto } from './dto/event-reply.dto';
import { MessageSentDto } from './dto/message-sent.dto';
import { RoomType } from './enums/room-type.enum';
import { MessageDeletedDto } from './dto/message-deleted.dto';
import { MessageUpdatedDto } from './dto/message-updated.dto';
import { Events } from './enums/events.enum';

@Injectable()
export class EventsService {
  constructor(
    private readonly workspacesService: WorkspacesService,
    private readonly channelsService: ChannelsService,
    private readonly messagesService: MessagesService,
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

  async handleUnsubscribe(
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

  async handleMessageSent(
    client: any,
    payload: MessageSentDto,
  ): Promise<EventReplyDto> {
    const message = await this.messagesService.createMessage(
      client.user,
      payload.data,
    );

    if (!message) {
      return {
        status: 'FAILED',
        error: {
          id: '500',
          message: 'Internal Server Error',
        },
        seq_reply: payload.seq,
      };
    }

    client
      .to('channel' + message.channel.id)
      .emit(Events.MESSAGE_SENT, message);

    return {
      status: 'OK',
      data: { message },
      seq_reply: payload.seq,
    };
  }

  async handleMessageDeleted(
    client: any,
    payload: MessageDeletedDto,
  ): Promise<EventReplyDto> {
    await this.messagesService.softDelete(client.user, payload.id);

    console.log('Deleting message', payload);

    const deletedMessage = {
      id: payload.id,
      channelId: payload.broadcast.channel_id,
    };

    client
      .to('channel' + payload.broadcast.channel_id)
      .emit(Events.MESSAGE_DELETED, deletedMessage);

    return {
      status: 'OK',
      data: {
        message_id: payload.id,
        message: 'Message successfully deleted',
      },
      seq_reply: payload.seq,
    };
  }
  async handleMessageUpdated(
    client: any,
    payload: MessageUpdatedDto,
  ): Promise<EventReplyDto> {
    const message = await this.messagesService.updateMessage(
      client.user,
      payload.id,
      payload.data,
    );

    if (!message) {
      return {
        status: 'FAILED',
        error: {
          id: '500',
          message: 'Internal Server Error',
        },
        seq_reply: payload.seq,
      };
    }

    client
      .to('channel' + message.channel.id)
      .emit(Events.MESSAGE_UPDATED, message);

    return {
      status: 'OK',
      data: { message },
      seq_reply: payload.seq,
    };
  }
}
