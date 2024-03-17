import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from '../../../../messages/infrastructure/persistence/entities/message.entity';
import { MessagesSeedService } from './messages-seed.service';
import { WorkspaceEntity } from 'src/workspaces/infrastructure/persistence/entities/workspace.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { ChannelEntity } from 'src/channels/infrastructure/persistence/entities/channel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MessageEntity,
      WorkspaceEntity,
      UserEntity,
      ChannelEntity,
    ]),
  ],
  providers: [MessagesSeedService],
  exports: [MessagesSeedService],
})
export class MessagesSeedModule {}
