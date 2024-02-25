import { Module } from '@nestjs/common';
import { WorkspaceRelationalRepository } from './repositories/workspace.repository';
import { WorkspaceRepository } from './workspace.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceEntity } from './entities/workspace.entity';
@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceEntity])],
  providers: [
    {
      provide: WorkspaceRepository,
      useClass: WorkspaceRelationalRepository,
    },
  ],
  exports: [WorkspaceRepository],
})
export class WorkspacePersistenceModule {}
