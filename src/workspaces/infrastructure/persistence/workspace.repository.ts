import { Workspace } from 'src/workspaces/domain/workspace';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { User } from 'src/users/domain/user';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

export abstract class WorkspaceRepository {
  abstract create(
    data: Omit<
      Workspace,
      'id' | 'members' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ): Promise<Workspace>;

  abstract findManyWithPagination(
    userId: User['id'],
    paginationOptions: IPaginationOptions,
  ): Promise<Workspace[]>;

  abstract findUsersWithPagination(
    workspaceId: Workspace['id'],
    paginationOptions: IPaginationOptions,
  ): Promise<User[]>;

  abstract findOne(
    fields: EntityCondition<Workspace>,
  ): Promise<NullableType<Workspace>>;

  abstract softDelete(id: Workspace['id']): Promise<void>;
}
