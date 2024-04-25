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
import { FilterChannelDto, SortChannelDto } from './dto/query-channel.dto';
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@Injectable()
export class ChannelsService {
  constructor(
    private readonly channelRepostory: ChannelRepository,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
    private readonly workspacesService: WorkspacesService,
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
    return this.usersService.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterChannelDto | null;
    sortOptions?: SortChannelDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Channel[]> {
    return this.channelRepostory.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  async addUsersToChannel(user: User, channelId: Channel['id'], users: User[]) {
    const channel = await this.channelRepostory.findOne({ id: channelId });
    if (!channel) {
      throw new NotFoundException();
    }
    if (channel.owner.id !== user.id) {
      throw new ForbiddenException();
    }
    const usersToAdd: User[] = [];
    users.forEach((user) => {
      if (
        !this.workspacesService.checkUserMembership(
          channel.workspace.id,
          user.id,
        )
      ) {
        usersToAdd.push(user);
      }
    });
    await this.channelRepostory.addUsers(channelId, usersToAdd);
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
