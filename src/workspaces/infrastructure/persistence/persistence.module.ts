import { Module } from '@nestjs/common';
import { WorkspaceRepository } from './repositories/workspace.repository';

import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceEntity } from './entities/workspace.entity';
@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceEntity])],
  providers: [WorkspaceRepository],
  exports: [WorkspaceRepository],
})
export class WorkspacePersistenceModule {}
