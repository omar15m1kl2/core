import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Query,
  Request,
  SerializeOptions,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { Workspace } from './domain/workspace';

@ApiTags('Workspaces')
@Controller({
  path: 'workspaces',
  version: '1',
})
export class WorkspacesController {
  constructor(private readonly service: WorkspacesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiQuery({
    name: 'page',
  })
  @ApiQuery({
    name: 'limit',
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @HttpCode(HttpStatus.OK)
  getWorkspaces(@Request() request, @Query() query: any) {
    return this.service.getWorkspaces(request.user, query);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createWorkspace(
    @Request() request,
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ) {
    return this.service.createWorkspace(request.user, createWorkspaceDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id/users')
  @ApiQuery({
    name: 'page',
  })
  @ApiQuery({
    name: 'limit',
  })
  @ApiParam({
    name: 'id',
  })
  @HttpCode(HttpStatus.OK)
  getWorkspaceUsers(
    @Param('id') workspaceI: Workspace['id'],
    @Query() query: any,
  ) {
    return this.service.getWorkspaceUsers(workspaceId, query);
  }
}
