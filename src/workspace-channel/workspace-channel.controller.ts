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
@Controller({
  version: '1',
})
export class WorkspaceChannelController {
  constructor(
    private readonly workspaceChannelService: WorkspaceChannelService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiTags('Workspaces')
  @Post('workspaces/:workspaceId/channels/:channelId/users')
  @ApiParam({
    name: 'workspaceId',
  })
  @ApiParam({
    name: 'channelId',
  })
  @HttpCode(HttpStatus.CREATED)
  addUserToChannel(
    @Param('workspaceId') workspaceId: Workspace['id'],
    @Param('channelId') channelId: Channel['id'],
    @Body() body: AddUsersToChannelDto,
    @Request() request,
  ) {
    return this.workspaceChannelService.addUsersToChannel(
      request.user,
      workspaceId,
      channelId,
      body,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiTags('Workspaces')
  @Get('workspaces/:id/channels')
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
