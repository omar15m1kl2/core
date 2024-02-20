import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceEntity } from 'src/workspaces/infrastructure/persistence/entities/workspace.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { WorkspaceSeedService } from './workspace-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceEntity, UserEntity])],
  providers: [WorkspaceSeedService],
  exports: [WorkspaceSeedService],
})
export class WorkspaceSeedModule {}
