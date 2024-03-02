import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelRelationalRepository } from './repositories/channel.repository';
import { ChannelEntity } from './entities/channel.entity';
import { ChannelRepository } from './channel.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEntity])],
  providers: [
    {
      provide: ChannelRepository,
      useClass: ChannelRelationalRepository,
    },
  ],
  exports: [ChannelRepository],
})
export class ChannelPersistenceModule {}
