import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('ws-jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    if (err || !user) {
      throw new WsException('Unauthorized') || err;
    }
    client.user = user;
    return user;
  }
}
