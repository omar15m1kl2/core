import { Invite } from 'src/invites/domain/invite';
import { User } from 'src/users/domain/user';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

export abstract class InviteRepository {
  abstract create(
    data: Omit<Invite, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Invite>;

  abstract findManyByEmails(emails: string[]): Promise<Invite[]>;

  abstract findManyWithPagination(
    userEmail: User['email'],
    paginationOptions: IPaginationOptions,
  ): Promise<Invite[]>;
}
