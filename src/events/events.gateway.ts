import {
  Injectable,
  UseGuards,
  Logger,
  UsePipes,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WsJwtAuthGuard } from 'src/auth/ws-jwt-auth/ws-jwt-auth.guard';
import { SocketAuthMiddleware } from 'src/auth/ws-jwt-auth/ws-jwt.middleware';
import { AllConfigType } from 'src/config/config.type';
import { Socket } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
import { MessageSentDto } from './dto/message-sent.dto';
import { EventReplyDto } from './dto/event-reply.dto';
import { SubscribeDto } from './dto/subscribe.dto';
import { WorkspacesService } from 'src/workspaces/workspaces.service';
import { ChannelsService } from 'src/channels/channels.service';
import { WsCatchAllFilter } from './exceptions/ws-catch-all';
import { RoomType } from './enums/room-type.enum';

@WebSocketGateway({
  namespace: 'events',
  cors: {
    origin: '*',
  },
})
@UsePipes(new ValidationPipe())
@UseFilters(new WsCatchAllFilter())
@UseGuards(WsJwtAuthGuard)
@Injectable()
export class EventsGateway {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly messagesService: MessagesService,
    private readonly workspacesService: WorkspacesService,
    private readonly channelsService: ChannelsService,
  ) {}
  @WebSocketServer()
  server: Server;

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware(this.configService) as any);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    Logger.log(client, payload);
    return 'Hello world!';
  }

  @SubscribeMessage('subscribe')
  async handleSubscribe(
    client: any,
    payload: SubscribeDto,
  ): Promise<EventReplyDto> {
    switch (payload.data.room_type) {
      case RoomType.Workspace: {
        const workspace = await this.workspacesService.checkUserMembership(
          payload.data.room_id,
          client.user.id,
        );

        if (!workspace) {
          return {
            status: 'FAILED',
            error: {
              id: '404',
              message: 'Forbidden',
            },
            seq_reply: payload.seq,
          };
        }

        payload.data.room_id = RoomType.Workspace + payload.data.room_id;
        break;
      }
      case RoomType.Channel: {
        const channel = await this.channelsService.checkUserMembership(
          payload.data.room_id,
          client.user.id,
        );

        if (!channel) {
          return {
            status: 'FAILED',
            error: {
              id: '404',
              message: 'Forbidden',
            },
            seq_reply: payload.seq,
          };
        }

        payload.data.room_id = RoomType.Channel + payload.data.room_id;
        break;
      }
      case RoomType.User: {
        payload.data.room_id = RoomType.User + payload.data.room_id;
        break;
      }
    }

    client.join(payload.data.room_id);
    return {
      status: 'OK',
      data: {
        room_id: payload.data.room_id,
        message: 'Subscribed',
      },
      seq_reply: payload.seq,
    };
  }

  @SubscribeMessage('message_sent')
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

    this.server
      .to('channel' + message.channel.id)
      .emit('message_sent', message);

    return {
      status: 'OK',
      data: { message },
      seq_reply: payload.seq,
    };
  }
}
