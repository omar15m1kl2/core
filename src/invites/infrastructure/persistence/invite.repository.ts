import { Invite } from 'src/invites/domain/invite';
import { User } from 'src/users/domain/user';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial } from 'typeorm';

export abstract class InviteRepository {
  abstract create(
    data: Omit<Invite, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Invite>;

  abstract findOne(
    fields: EntityCondition<Invite>,
  ): Promise<NullableType<Invite>>;

  abstract update(
    id: Invite['id'],
    payload: DeepPartial<Invite>,
  ): Promise<Invite>;

  abstract findManyWithPagination(
    userEmail: User['email'],
    paginationOptions: IPaginationOptions,
  ): Promise<Invite[]>;
}
