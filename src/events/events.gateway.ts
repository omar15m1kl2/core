import {
  Injectable,
  UseGuards,
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
import { MessageSentDto } from './dto/message-sent.dto';
import { EventReplyDto } from './dto/event-reply.dto';
import { SubscriptionDto } from './dto/subscribe.dto';
import { WsCatchAllFilter } from './exceptions/ws-catch-all';
import { EventsService } from './events.service';
import { MessageDeletedDto } from './dto/message-deleted.dto';
import { MessageUpdatedDto } from './dto/message-updated.dto';
import { Events } from './enums/events.enum';
import { ChannelCreatedDto } from './dto/channel-created.dto';

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
    private readonly eventsService: EventsService,
  ) {}
  @WebSocketServer()
  server: Server;

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware(this.configService) as any);
  }

  @SubscribeMessage(Events.SUBSCRIBE)
  async subscribe(
    client: any,
    payload: SubscriptionDto,
  ): Promise<EventReplyDto> {
    return this.eventsService.handleSubscribe(client, payload);
  }

  @SubscribeMessage(Events.UNSUBSCRIBE)
  async unsubscribe(
    client: any,
    payload: SubscriptionDto,
  ): Promise<EventReplyDto> {
    return this.eventsService.unsubscribe(client, payload);
  }

  @SubscribeMessage(Events.MESSAGE_SENT)
  async messageSent(
    client: any,
    payload: MessageSentDto,
  ): Promise<EventReplyDto> {
    return this.eventsService.messageSent(client, payload);
  }

  @SubscribeMessage(Events.MESSAGE_DELETED)
  async messageDeleted(
    client: any,
    payload: MessageDeletedDto,
  ): Promise<EventReplyDto> {
    return this.eventsService.messageDeleted(client, payload);
  }

  @SubscribeMessage(Events.MESSAGE_UPDATED)
  async messageUpdated(
    client: any,
    payload: MessageUpdatedDto,
  ): Promise<EventReplyDto> {
    return this.eventsService.messageUpdated(client, payload);
  }

  @SubscribeMessage(Events.CHANNEL_CREATED)
  async channelCreated(
    client: any,
    payload: ChannelCreatedDto,
  ): Promise<EventReplyDto> {
    return this.eventsService.channelCreated(client, payload);
  }
}
