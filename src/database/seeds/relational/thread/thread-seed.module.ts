import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadEntity } from 'src/threads/infrastructure/persistence/relational/entities/thread.entity';
import { ThreadSeedService } from './thread-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([ThreadEntity])],
  providers: [ThreadSeedService],
  exports: [ThreadSeedService],
})
export class ThreadSeedModule {}
