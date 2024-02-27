import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from 'src/workspaces/domain/workspace';
import { WorkspaceEntity } from '../entities/workspace.entity';
import { WorkspaceMapper } from '../mappers/workspace.mapper';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { User } from 'src/users/domain/user';
import { WorkspaceRepository } from '../workspace.repository';

@Injectable()
export class WorkspaceRelationalRepository implements WorkspaceRepository {
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

  async findManyWithPagination(
    userId: number,
    paginationOptions: IPaginationOptions,
  ): Promise<Workspace[]> {
    const entities = await this.workspaceRepository.find({
      where: {
        members: {
          id: userId,
        },
      },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
    return entities.map((workspace) => WorkspaceMapper.toDomain(workspace));
  }

  async findUsersWithPagination(
    workspaceId: number,
    paginationOptions: IPaginationOptions,
  ): Promise<User[]> {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id: workspaceId,
      },
      relations: {
        members: true,
      },
    });

    if (!workspace) {
      throw new Error('Workspace not found');
    }

    const members = workspace.members.slice(
      (paginationOptions.page - 1) * paginationOptions.limit,
      paginationOptions.page * paginationOptions.limit,
    );

    return members;
  }
}
