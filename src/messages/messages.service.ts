import { Injectable } from '@nestjs/common';
import { MessageRepository } from './infrastructure/persistence/message.repository';
import {
  ICursorPaginationOptions,
  IPaginationOptions,
} from 'src/utils/types/pagination-options';
import { Channel } from 'src/channels/domain/channel';
import { User } from '../users/domain/user';
import { Message } from './domain/message';
import { Workspace } from '../workspaces/domain/workspace';
import { FilterMessageDto, SortMessageDto } from './dto/query-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async getMessagesWithCursorPagination({
    channelId,
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    channelId: Channel['id'];
    filterOptions?: FilterMessageDto | null;
    sortOptions?: SortMessageDto[] | null;
    paginationOptions: ICursorPaginationOptions;
  }): Promise<{ messages: Message[]; nextCursor: number | null }> {
    return await this.messageRepository.findMessagesWithCursorPagination({
      channelId,
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  async findUserThreadsWithPagination(
    workspaceId: Workspace['id'],
    userId: User['id'],
    query: IPaginationOptions,
  ): Promise<Message[]> {
    return this.messageRepository.findUserThreadsWithPagination(
      workspaceId as number,
      userId,
      query,
    );
  }

  async unsubscribeThread(userId: User['id'], parentMessageId: Message['id']) {
    return this.messageRepository.unsubscribeThread(userId, parentMessageId);
  }

  async subscribeThread(userId: User['id'], parentMessageId: Message['id']) {
    return this.messageRepository.subscribeThread(userId, parentMessageId);
  }
}
