import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { ChannelPersistenceModule } from './infrastructure/persistence/persistence.module';
import { MessagesModule } from 'src/messages/messages.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ChannelPersistenceModule, MessagesModule, UsersModule],
  controllers: [ChannelsController],
  providers: [ChannelsService],
  exports: [ChannelsService],
})
export class ChannelsModule {}
