import { Module } from '@nestjs/common';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';
import { WorkspacePersistenceModule } from './infrastructure/persistence/persistence.module';

@Module({
  imports: [WorkspacePersistenceModule],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
})
export class WorkspacesModule {}
