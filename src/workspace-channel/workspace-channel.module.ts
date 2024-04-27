import { Module } from '@nestjs/common';
import { WorkspaceChannelService } from './workspace-channel.service';
import { ChannelsModule } from 'src/channels/channels.module';
import { WorkspacesModule } from 'src/workspaces/workspaces.module';
import { WorkspaceChannelController } from './workspace-channel.controller';

@Module({
  imports: [ChannelsModule, WorkspacesModule],
  providers: [WorkspaceChannelService],
  controllers: [WorkspaceChannelController],
  exports: [WorkspaceChannelService],
})
export class WorkspaceChannelModule {}
