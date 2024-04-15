import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InviteStatusEntity } from 'src/inviteStatuses/infrastructure/persistence/relational/entities/invite-status.entity';
import { InviteStatusSeedService } from './invite-status.seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([InviteStatusEntity])],
  providers: [InviteStatusSeedService],
  exports: [InviteStatusSeedService],
})
export class InviteStatusSeedModule {}
