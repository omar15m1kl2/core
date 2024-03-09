import { Injectable } from '@nestjs/common';
import { ThreadRepository } from '../threads.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadParticipantEntity } from '../entities/thread.entity';
import { Repository } from 'typeorm';
import { ThreadMapper } from '../mappers/thread.mapper';
import { ThreadParticipant } from '../../../../domain/thread';

@Injectable()
export class ThreadRelationalRepository implements ThreadRepository {
  constructor(
    @InjectRepository(ThreadParticipantEntity)
    private readonly ThreadRepository: Repository<ThreadParticipantEntity>,
  ) {}

  async create(data: ThreadParticipant): Promise<ThreadParticipant> {
    const persistenceModel = ThreadMapper.toPersistence(data);

    const newEntity = await this.ThreadRepository.save(
      this.ThreadRepository.create(persistenceModel),
    );

    return ThreadMapper.toDomain(newEntity);
  }
}
