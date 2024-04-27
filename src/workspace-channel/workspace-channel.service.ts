import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChannelsService } from 'src/channels/channels.service';
import { Channel } from 'src/channels/domain/channel';
import {
  FilterChannelDto,
  SortChannelDto,
} from 'src/channels/dto/query-channel.dto';
import { User } from 'src/users/domain/user';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Workspace } from 'src/workspaces/domain/workspace';
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@Injectable()
export class WorkspaceChannelService {
  constructor(
    private readonly workspacesService: WorkspacesService,
    private readonly channelsService: ChannelsService,
  ) {}

  async addUsersToChannel(
    user: User,
    workspaceId: Workspace['id'],
    channelId: Channel['id'],
    users: User[],
  ) {
    const channel = await this.channelsService.getChannelById(user, channelId);
    if (!channel) {
      return new NotFoundException();
    }
    if (channel.owner.id !== user.id) {
      return new ForbiddenException();
    }

    const checkMembershipPromises = users.map((user) =>
      this.workspacesService
        .checkUserMembership(workspaceId, user.id)
        .then((isMember) => (isMember ? user : null)),
    );

    const usersToAdd: User[] = (
      await Promise.all(checkMembershipPromises)
    ).filter((user): user is User => user !== null);

    const uniqueArray = [...new Set(usersToAdd)];
    if (uniqueArray.length === 0) {
      return;
    }
    await this.channelsService.addUsersToChannel(channelId, uniqueArray);
  }

  async getWorkspaceChannels({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterChannelDto | null;
    sortOptions?: SortChannelDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Channel[]> {
    return this.channelsService.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }
}
