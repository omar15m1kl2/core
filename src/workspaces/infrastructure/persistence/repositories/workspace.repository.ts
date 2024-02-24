import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from 'src/workspaces/domain/workspace';
import { WorkspaceEntity } from '../entities/workspace.entity';
import { WorkspaceMapper } from '../mappers/workspace.mapper';

@Injectable()
export class WorkspaceRepository {
  constructor(
    @InjectRepository(WorkspaceEntity)
    private readonly workspaceRepository: Repository<WorkspaceEntity>,
  ) {}

  async create(data: Workspace): Promise<Workspace> {
    const persistenceModel = WorkspaceMapper.toPersistence(data);
    const newEntity = await this.workspaceRepository.save(
      this.workspaceRepository.create(persistenceModel),
    );
    return WorkspaceMapper.toDomain(newEntity);
  }
}