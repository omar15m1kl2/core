import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { RelationalThreadPersistenceModule } from './infrastructure/persistence/persistence.module';

// Temporary solution until someone removes all the document-based database code from the whole codebase
const infrastructurePersistenceModule = RelationalThreadPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  providers: [ThreadsService],
  controllers: [ThreadsController],
})
export class ThreadsModule {}
