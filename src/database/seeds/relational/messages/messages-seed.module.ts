import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from '../../../../messages/infrastructure/messages.entities';
import { MessagesSeedService } from './messages-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [MessagesSeedService],
  exports: [MessagesSeedService],
})
export class MessagesSeedModule {}
