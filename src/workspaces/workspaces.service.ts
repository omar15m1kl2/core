import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from './infrastructure/persistence/repositories/workspace.repository';
import { User } from 'src/users/domain/user';

@Injectable()
export class WorkspacesService {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async getWorkspaces(
    user: User,
    paginationOptions: { page: number; limit: number },
  ) {
    return this.workspaceRepository.findManyWithPagination({
      user,
      paginationOptions,
    });
  }
}
