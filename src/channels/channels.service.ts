import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChannelRepository } from './infrastructure/persistence/channel.repository';
import { User } from 'src/users/domain/user';
import { CreateChannelDto } from './dto/create-channel.dto';
import { Channel } from './domain/channel';
import { FilterUserDto, SortUserDto } from '../users/dto/query-user.dto';
import {
  ICursorPaginationOptions,
  IPaginationOptions,
} from '../utils/types/pagination-options';
import { UsersService } from '../users/users.service';
import { Message } from '../messages/domain/message';
import { MessagesService } from '../messages/messages.service';
import {
  FilterMessageDto,
  SortMessageDto,
} from 'src/messages/dto/query-message.dto';

@Injectable()
export class ChannelsService {
  constructor(
    private readonly channelRepostory: ChannelRepository,
    private readonly userService: UsersService,
    private readonly messagesService: MessagesService,
  ) {}

  async createChannel(user: User, createChannelDto: CreateChannelDto) {
    createChannelDto.members
      ? createChannelDto.members.push(user)
      : (createChannelDto.members = [user]);

    const clonedPayload = {
      owner: user,
      ...createChannelDto,
    };

    return this.channelRepostory.create(clonedPayload);
  }

  async getChannelById(user: User, id: Channel['id']) {
    const channel = await this.channelRepostory.findOne({ id });

    if (!channel) {
      throw new NotFoundException();
    }

    if (!channel.members.find((member) => member.id === user.id)) {
      throw new ForbiddenException();
    }

    return channel;
  }

  async update(
    user: User,
    id: Channel['id'],
    payload: Partial<Channel>,
  ): Promise<Channel | null> {
    const channel = await this.channelRepostory.findOne({ id });
    if (!channel) {
      throw new NotFoundException();
    }

    if (channel.owner.id !== user.id) {
      throw new ForbiddenException();
    }

    return this.channelRepostory.update(id, payload);
  }

  async getChannelUsers({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    return this.userService.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  async getChannelDraftMessage(
    channelId: Channel['id'],
    userId: User['id'],
  ): Promise<Message | null> {
    return this.messagesService.getChannelDraftMessage(channelId, userId);
  }

  async softDelete(user: User, id: Channel['id']): Promise<void> {
    const channel = await this.channelRepostory.findOne({ id });
    if (!channel) {
      throw new NotFoundException();
    }

    if (channel.owner.id !== user.id) {
      throw new ForbiddenException();
    }

    await this.channelRepostory.softDelete(id);
  }

  getMessagesWithCursorPagination({
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
    return this.messagesService.getMessagesWithCursorPagination({
      channelId,
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }
}
