import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelEntity } from '../../../../channels/infrastructure/persistence/entities/channel.entity';
import { ChannelSeedService } from './channel-seed.service';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { WorkspaceEntity } from '../../../../workspaces/infrastructure/persistence/entities/workspace.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelEntity, UserEntity, WorkspaceEntity]),
  ],
  providers: [ChannelSeedService],
  exports: [ChannelSeedService],
})
export class ChannelSeedModule {}
