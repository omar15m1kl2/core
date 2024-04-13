import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  exports: [EventsGateway],
  providers: [EventsGateway],
})
export class EventsModule {}
