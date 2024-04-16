import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { InvitePersistenceModule } from './infrastructure/persistence/persistence.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [InvitePersistenceModule, UsersModule],
  controllers: [InvitesController],
  providers: [InvitesService],
  exports: [InvitesService],
})
export class InvitesModule {}
