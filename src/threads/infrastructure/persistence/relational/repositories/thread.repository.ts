import { Injectable } from '@nestjs/common';
import { ThreadRepository } from '../threads.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadEntity } from '../entities/thread.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Thread } from 'src/threads/domain/thread';
import { ThreadMapper } from '../mappers/thread.mapper';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { User } from 'src/users/domain/user';

@Injectable()
export class ThreadRelationalRepository implements ThreadRepository {
  constructor(
    @InjectRepository(ThreadEntity)
    private readonly ThreadRepository: Repository<ThreadEntity>,
  ) {}

  async create(data: Thread): Promise<Thread> {
    const persistenceModel = ThreadMapper.toPersistence(data);

    const newEntity = await this.ThreadRepository.save(
      this.ThreadRepository.create(persistenceModel),
    );

    return ThreadMapper.toDomain(newEntity);
  }

  async findManyWithPagination(
    userId: User['id'],
    paginationOptions: IPaginationOptions,
  ): Promise<Thread[]> {
    const entities = await this.ThreadRepository.find({
      where: {
        participants: {
          id: userId as number,
        },
      },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
    return entities.map((thread) => ThreadMapper.toDomain(thread));
  }

  async findOne(
    fields: EntityCondition<Thread>,
  ): Promise<NullableType<Thread>> {
    const entity = await this.ThreadRepository.findOne({
      where: fields as FindOptionsWhere<ThreadEntity>,
    });

    return entity ? ThreadMapper.toDomain(entity) : null;
  }

  async softDelete(id: Thread['id']): Promise<void> {
    await this.ThreadRepository.softDelete(id);
  }

  // TODO - implement the logic
  // async update(
  //   ThreadId: Thread['id'],
  //   payload: UpdateThreadDto,
  // ): Promise<Thread> {
  //   const entity = await this.ThreadRepository.findOne({
  //     where: {
  //       id: Number(ThreadId),
  //     },
  //   });

  //   if (!entity) throw new Error('Thread not found');

  //   const updatedEntity = await this.ThreadRepository.save(
  //     this.ThreadRepository.create(
  //       ThreadMapper.toPersistence({
  //         ...ThreadMapper.toDomain(entity),
  //         ...payload,
  //       }),
  //     ),
  //   );

  //   return ThreadMapper.toDomain(updatedEntity);
  // }
}
