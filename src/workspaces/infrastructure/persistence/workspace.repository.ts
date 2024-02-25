import { Workspace } from 'src/workspaces/domain/workspace';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { User } from 'src/users/domain/user';

export abstract class WorkspaceRepository {
  abstract create(
    data: Omit<
      Workspace,
      'id' | 'members' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ): Promise<Workspace>;

  abstract findManyWithPagination({
    user,
    paginationOptions,
  }: {
    user: User;
    paginationOptions: IPaginationOptions;
  }): Promise<Workspace[]>;
}
