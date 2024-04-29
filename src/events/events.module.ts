import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { MessagesModule } from 'src/messages/messages.module';
import { WorkspacesModule } from 'src/workspaces/workspaces.module';
import { ChannelsModule } from 'src/channels/channels.module';
import { EventsService } from './events.service';
import { MessagesEventService } from './messages.service';

@Module({
  imports: [AuthModule, MessagesModule, WorkspacesModule, ChannelsModule],
  exports: [EventsGateway],
  providers: [EventsGateway, EventsService, MessagesEventService],
})
export class EventsModule {}
