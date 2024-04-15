import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { InvitePersistenceModule } from './infrastructure/persistence/persistence.module';

@Module({
  imports: [InvitePersistenceModule],
  controllers: [InvitesController],
  providers: [InvitesService],
  exports: [InvitesService],
})
export class InvitesModule {}
