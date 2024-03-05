import { Injectable } from '@nestjs/common';
import { ThreadEntity } from '../entities/threads.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThreadRepository {
  constructor(private readonly threadRepository: Repository<ThreadEntity>) {}
}
