import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { InvitesService } from './invites.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Invites')
@Controller({
  path: 'invites',
  version: '1',
})
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

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
  @HttpCode(HttpStatus.OK)
  getInvites(@Request() request, @Query() query: any) {
    query.page = query.page ?? 1;
    query.limit = query.limit ?? 10;
    return this.invitesService.getInvitesWithPagination(request.user, query);
  }
}
