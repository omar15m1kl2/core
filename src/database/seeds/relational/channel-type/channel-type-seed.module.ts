import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelTypeEntity } from 'src/channel-types/infrastructure/persistence/relational/entities/channel-type.entity';
import { ChannelTypeSeedService } from './channel-type-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelTypeEntity])],
  providers: [ChannelTypeSeedService],
  exports: [ChannelTypeSeedService],
})
export class ChannelTypeSeedModule {}
