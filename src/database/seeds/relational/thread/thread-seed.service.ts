import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadParticipantEntity } from 'src/threads/infrastructure/persistence/relational/entities/thread.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThreadSeedService {
  constructor(
    @InjectRepository(ThreadParticipantEntity)
    private repository: Repository<ThreadParticipantEntity>,
  ) {}

  // TODO - implement the logic
  async run() {
    // await this.repository.save(threads);
  }
}
