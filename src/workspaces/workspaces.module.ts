import { Module } from '@nestjs/common';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';
import { WorkspacePersistenceModule } from './infrastructure/persistence/persistence.module';
import { UsersModule } from '../users/users.module';
import { MessagesModule } from '../messages/messages.module';
import { InvitesModule } from 'src/invites/invites.module';

@Module({
  imports: [
    WorkspacePersistenceModule,
    UsersModule,
    MessagesModule,
    InvitesModule,
  ],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
})
export class WorkspacesModule {}
