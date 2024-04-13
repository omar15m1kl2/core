import { Injectable, UseGuards, Logger } from '@nestjs/common';
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

@WebSocketGateway({
  namespace: 'events',
  cors: {
    origin: '*',
  },
})
@UseGuards(WsJwtAuthGuard)
@Injectable()
export class EventsGateway {
  constructor(private configService: ConfigService<AllConfigType>) {}
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
}
