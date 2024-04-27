import { Module } from '@nestjs/common';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';
import { WorkspacePersistenceModule } from './infrastructure/persistence/persistence.module';
import { UsersModule } from '../users/users.module';
import { MessagesModule } from '../messages/messages.module';
import { InvitesModule } from 'src/invites/invites.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    WorkspacePersistenceModule,
    UsersModule,
    MessagesModule,
    InvitesModule,
    FilesModule,
  ],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
  exports: [WorkspacesService],
})
export class WorkspacesModule {}
