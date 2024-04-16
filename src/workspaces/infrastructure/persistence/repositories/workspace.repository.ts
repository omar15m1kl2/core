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
import { UpdateWorkspaceDto } from 'src/workspaces/dto/update-workspace.dto';
import { Channel } from '../../../../channels/domain/channel';

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

  async findChannelsWithPagination(
    workspaceId: Workspace['id'],
    paginationOptions: IPaginationOptions,
  ): Promise<Channel[]> {
    const workspace = await this.workspaceRepository.findOne({
      where: { id: workspaceId as number },
      relations: {
        channels: true,
      },
    });

    if (!workspace) {
      throw new Error('Workspace not found');
    }

    const channels = workspace.channels.slice(
      (paginationOptions.page - 1) * paginationOptions.limit,
      paginationOptions.page * paginationOptions.limit,
    );

    return channels;
  }

  async findOne(
    fields: EntityCondition<Workspace>,
  ): Promise<NullableType<Workspace>> {
    const entity = await this.workspaceRepository.findOne({
      where: fields as FindOptionsWhere<WorkspaceEntity>,
    });

    return entity ? WorkspaceMapper.toDomain(entity) : null;
  }

  async findWorkspaceByMemberId(
    workspaceId: Workspace['id'],
    memberId: User['id'],
  ): Promise<NullableType<Workspace>> {
    return this.workspaceRepository.findOne({
      where: {
        id: workspaceId as number,
        members: {
          id: memberId as number,
        },
      },
    });
  }

  async softDelete(id: Workspace['id']): Promise<void> {
    await this.workspaceRepository.softDelete(id);
  }

  async update(
    workspaceId: Workspace['id'],
    payload: UpdateWorkspaceDto,
  ): Promise<Workspace> {
    const entity = await this.workspaceRepository.findOne({
      where: {
        id: Number(workspaceId),
      },
    });

    if (!entity) throw new Error('Workspace not found');

    const updatedEntity = await this.workspaceRepository.save(
      this.workspaceRepository.create(
        WorkspaceMapper.toPersistence({
          ...WorkspaceMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return WorkspaceMapper.toDomain(updatedEntity);
  }
}
