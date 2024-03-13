import { Module } from '@nestjs/common';
import { ThreadsController } from './threads.controller';
import { ThreadsService } from './threads.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ThreadsController],
  providers: [ThreadsService],
  imports: [UsersModule],
})
export class ThreadsModule {}
