import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Workspace } from 'src/workspaces/domain/workspace';
import { WorkspaceEntity } from '../entities/workspace.entity';
import { WorkspaceMapper } from '../mappers/workspace.mapper';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { User } from 'src/users/domain/user';
import { WorkspaceRepository } from '../workspace.repository';
import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

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
    userId: User['id'],
    paginationOptions: IPaginationOptions,
  ): Promise<Workspace[]> {
    const entities = await this.workspaceRepository.find({
      where: {
        members: {
          id: userId as number,
        },
      },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
    return entities.map((workspace) => WorkspaceMapper.toDomain(workspace));
  }

  async findUsersWithPagination(
    workspaceId: Workspace['id'],
    paginationOptions: IPaginationOptions,
  ): Promise<User[]> {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id: workspaceId as number,
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

  async findOne(
    fields: EntityCondition<Workspace>,
  ): Promise<NullableType<Workspace>> {
    const entity = await this.workspaceRepository.findOne({
      where: fields as FindOptionsWhere<WorkspaceEntity>,
    });

    return entity ? WorkspaceMapper.toDomain(entity) : null;
  }

  async softDelete(id: Workspace['id'], userId: User['id']): Promise<void> {
    const entity = await this.workspaceRepository.findOne({
      where: {
        id: Number(id),
        owner: {
          id: Number(userId),
        },
      },
    });
    if (!entity) {
      throw new Error('Workspace not found');
    }

    await this.workspaceRepository.softDelete(id);
  }
}
