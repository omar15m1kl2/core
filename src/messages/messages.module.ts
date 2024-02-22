import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { FilesService } from 'src/files/files.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, FilesService]
})
export class MessagesModule { }
