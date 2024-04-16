import { Injectable } from '@nestjs/common';
import { InviteRepository } from '../invite.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { InviteEntity } from '../entities/invite.entity';
import { InviteMapper } from '../mappers/invite.mapper';
import { In, Repository } from 'typeorm';
import { Invite } from 'src/invites/domain/invite';
import { User } from 'src/users/domain/user';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

@Injectable()
export class InviteRelationalRepository implements InviteRepository {
  constructor(
    @InjectRepository(InviteEntity)
    private readonly inviteRepository: Repository<InviteEntity>,
  ) {}

  async create(data: Invite): Promise<Invite> {
    const persistenceModel = InviteMapper.toPersistence(data);
    const newEntity = await this.inviteRepository.save(
      this.inviteRepository.create(persistenceModel),
    );
    return InviteMapper.toDomain(newEntity);
  }

  async findManyByEmails(emails: string[]): Promise<Invite[]> {
    const entities = await this.inviteRepository.find({
      where: {
        invitee_email: In(emails),
      },
    });
    return entities.map((entity) => InviteMapper.toDomain(entity));
  }

  async findManyWithPagination(
    userEmail: User['email'],
    paginationOptions: IPaginationOptions,
  ): Promise<Invite[]> {
    const entities = await this.inviteRepository.find({
      where: {
        invitee_email: userEmail as string,
      },
      relations: ['workspace'],
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => InviteMapper.toDomain(entity));
  }
}
