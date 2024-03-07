import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadEntity } from 'src/threads/infrastructure/persistence/relational/entities/thread.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThreadSeedService {
  constructor(
    @InjectRepository(ThreadEntity)
    private repository: Repository<ThreadEntity>,
  ) {}

  // TODO - implement the logic
  async run() {
    // await this.repository.save(threads);
  }
}
