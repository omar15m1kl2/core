import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { ChannelPersistenceModule } from './infrastructure/persistence/persistence.module';
import { WorkspacePersistenceModule } from 'src/workspaces/infrastructure/persistence/persistence.module';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [
    ChannelPersistenceModule,
    WorkspacePersistenceModule,
    MessagesModule,
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService],
})
export class ChannelsModule {}
