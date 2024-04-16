import { Invite } from 'src/invites/domain/invite';

export abstract class InviteRepository {
  abstract create(
    data: Omit<Invite, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Invite>;

  abstract findManyByEmails(emails: string[]): Promise<Invite[]>;
}
