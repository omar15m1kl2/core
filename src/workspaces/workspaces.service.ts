import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { WorkspaceRepository } from './infrastructure/persistence/workspace.repository';
import { User } from 'src/users/domain/user';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace } from './domain/workspace';

@Injectable()
export class WorkspacesService {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

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
    workspaceId: Workspace['id'],
    paginationOptions: { page: number; limit: number },
  ) {
    return this.workspaceRepository.findUsersWithPagination(
      workspaceId,
      paginationOptions,
    );
  }

  async getWorkspaceChannels(
    workspaceId: Workspace['id'],
    paginationOptions: { page: number; limit: number },
  ) {
    return this.workspaceRepository.findChannelsWithPagination(
      workspaceId,
      paginationOptions,
    );
  }

  async updateWorkspace(
    id: Workspace['id'],
    user: User,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    const workspace = await this.workspaceRepository.findOne({ id });
    if (!workspace) {
      throw new NotFoundException();
    }

    if (workspace?.owner.id !== user.id) {
      throw new UnauthorizedException();
    }

    return this.workspaceRepository.update(id, updateWorkspaceDto);
  }

  async remove(id: Workspace['id'], user: User) {
    const workspace = await this.workspaceRepository.findOne({ id });

    if (!workspace) {
      throw new NotFoundException();
    }

    if (workspace?.owner.id !== user.id) {
      throw new UnauthorizedException();
    }
    await this.workspaceRepository.softDelete(id);
  }
}
