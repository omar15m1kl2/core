import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceChannelService } from './workspace-channel.service';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Channel } from 'src/channels/domain/channel';
import { AddUsersToChannelDto } from 'src/channels/dto/add-users-to-channel.dto';
import { Workspace } from 'src/workspaces/domain/workspace';
import { QueryChannelDto } from 'src/channels/dto/query-channel.dto';
import { infinityPagination } from 'src/utils/infinity-pagination';

@ApiTags('Workspaces')
@Controller({
  path: 'workspces/:id/channels',
  version: '1',
})
@ApiParam({
  name: 'id',
})
export class WorkspaceChannelController {
  constructor(
    private readonly workspaceChannelService: WorkspaceChannelService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post(':channelId/addUser')
  @ApiParam({
    name: 'channelId',
  })
  @HttpCode(HttpStatus.CREATED)
  addUserToChannel(
    @Param('id') workspaceId: Workspace['id'],
    @Param('channelId') channelId: Channel['id'],
    @Body() body: AddUsersToChannelDto,
    @Request() request,
  ) {
    return this.workspaceChannelService.addUsersToChannel(
      request.user,
      workspaceId,
      channelId,
      body.Users,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @ApiParam({
    name: 'id',
  })
  @HttpCode(HttpStatus.OK)
  async getWorkspaceChannels(
    @Param('id') workspaceId: Workspace['id'],
    @Request() request,
    @Query() query: QueryChannelDto,
  ) {
    const page = query.page ?? 1;
    let limit = query.limit ?? 10;
    if (limit > 30) {
      limit = 30;
    }
    return infinityPagination(
      await this.workspaceChannelService.getWorkspaceChannels({
        filterOptions: {
          workspaceId,
          userId: request.user.id,
          ...query?.filters,
        },
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }
}
