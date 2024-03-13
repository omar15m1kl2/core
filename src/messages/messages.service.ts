import { Injectable } from '@nestjs/common';
import { MessageRepository } from './infrastructure/presistence/message.repository';
import {
  ICursorPaginationOptions,
  IPaginationOptions,
} from 'src/utils/types/pagination-options';
import { Channel } from 'src/channels/domain/channel';
import { User } from '../users/domain/user';
import { Message } from './domain/message';

@Injectable()
export class MessagesService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async getMessagesWithCursorPagination(
    channelId: Channel['id'],
    paginationOptions: ICursorPaginationOptions,
  ) {
    return await this.messageRepository.findMessagesWithCursorPagination(
      channelId,
      paginationOptions,
    );
  }

  async findUserThreadsWithPagination(
    id: User['id'],
    query: IPaginationOptions,
  ): Promise<Message[]> {
    return this.messageRepository.findUserThreadsWithPagination(id, query);
  }
}
