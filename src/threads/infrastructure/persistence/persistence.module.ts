import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadParticipantEntity } from './relational/entities/thread.entity';
import { ThreadRepository } from './relational/threads.repository';
import { ThreadRelationalRepository } from './relational/repositories/thread.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ThreadParticipantEntity])],
  providers: [
    {
      provide: ThreadRepository,
      useClass: ThreadRelationalRepository,
    },
  ],
  exports: [ThreadRepository],
})
export class RelationalThreadPersistenceModule {}
