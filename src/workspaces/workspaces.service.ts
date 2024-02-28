import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from './infrastructure/persistence/workspace.repository';
import { User } from 'src/users/domain/user';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { Workspace } from './domain/workspace';

@Injectable()
export class WorkspacesService {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async getWorkspaces(
    user: User,
    paginationOptions: { page: number; limit: number },
  ) {
    return this.workspaceRepository.findManyWithPagination(
      user.id as number,
      paginationOptions,
    );
  }

  async createWorkspace(user: User, createWorkspaceDto: CreateWorkspaceDto) {
    const clonedPayload = {
      owner: user,
      members: [user],
      ...createWorkspaceDto,
    };

    return this.workspaceRepository.create(clonedPayload);
  }

  async getWorkspaceUsers(
    workspaceId: number,
    paginationOptions: { page: number; limit: number },
  ) {
    return this.workspaceRepository.findUsersWithPagination(
      workspaceId,
      paginationOptions,
    );
  }

  async softDelete(id: Workspace['id'], userId: User['id']) {
    await this.workspaceRepository.softDelete(id, userId);
  }
}
