import { Injectable } from '@nestjs/common';
import { Message } from 'src/messages/domain/message';
import { Channel } from 'src/channels/domain/channel';
import {
  ICursorPaginationOptions,
  IPaginationOptions,
} from 'src/utils/types/pagination-options';
import { User } from '../../../users/domain/user';
import { Workspace } from 'src/workspaces/domain/workspace';
import {
  FilterMessageDto,
  SortMessageDto,
} from 'src/messages/dto/query-message.dto';

@Injectable()
export abstract class MessageRepository {
  abstract create(data: Message): Promise<Message>;

  abstract findMessagesWithCursorPagination({
    channelId,
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    channelId: Channel['id'];
    filterOptions?: FilterMessageDto | null;
    sortOptions?: SortMessageDto[] | null;
    paginationOptions: ICursorPaginationOptions;
  }): Promise<{ messages: Message[]; nextCursor: number | null }>;

  abstract findUserThreadsWithPagination(
    workspaceId: Workspace['id'],
    userId: User['id'],
    query: IPaginationOptions,
  ): Promise<Message[]>;

  abstract getChannelDraftMessage(
    channelId: Channel['id'],
    userId: User['id'],
  ): Promise<Message | null>;

  abstract removeDraft(id: Message['id']): Promise<void>;

  abstract unsubscribeThread(
    userId: User['id'],
    parentMessageId: Message['id'],
  ): Promise<void>;

  abstract subscribeThread(
    userId: User['id'],
    parentMessageId: Message['id'],
  ): Promise<void>;
}
