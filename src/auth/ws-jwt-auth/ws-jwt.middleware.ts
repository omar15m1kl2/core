import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { UnauthorizedException } from '@nestjs/common';

type SocketIOMiddleWare = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (
  configService: ConfigService<AllConfigType>,
): SocketIOMiddleWare => {
  return (client, next) => {
    try {
      const authorization =
        client.handshake.headers.authorization?.split(' ')[1];
      if (!authorization) {
        throw new UnauthorizedException();
      }
      const secretKey = configService.get('auth.secret', { infer: true });
      verify(authorization, secretKey as string);

      next();
    } catch (error) {
      next(error);
    }
  };
};
