import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { MessagesModule } from 'src/messages/messages.module';
import { WorkspacesModule } from 'src/workspaces/workspaces.module';
import { ChannelsModule } from 'src/channels/channels.module';

@Module({
  imports: [AuthModule, MessagesModule, WorkspacesModule, ChannelsModule],
  exports: [EventsGateway],
  providers: [EventsGateway],
})
export class EventsModule {}
