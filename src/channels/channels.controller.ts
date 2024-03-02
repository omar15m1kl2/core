import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Param,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Channel } from './domain/channel';

@ApiTags('Channels')
@Controller({
  path: 'channels',
  version: '1',
})
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createChannel(
    @Request() request,
    @Body() createChannelDto: CreateChannelDto,
  ) {
    return this.channelsService.createChannel(request.user, createChannelDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiParam({
    name: 'id',
  })
  @HttpCode(HttpStatus.OK)
  getChannelById(@Request() request, @Param('id') id: Channel['id']) {
    return this.channelsService.getChannelById(request.user, id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id/messages')
  @ApiParam({
    name: 'id',
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  getChannelMessages(@Param('id') id: Channel['id'], @Query() query: any) {
    query.page = query.page ?? 1;
    query.limit = query.limit ?? 20;
    if (query.limit > 100) {
      query.limit = 100;
    }
    return this.channelsService.getChannelMessages(id, query);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiParam({
    name: 'id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Channel['id'], @Request() request): Promise<void> {
    return this.channelsService.softDelete(request.user, id);
  }
}
