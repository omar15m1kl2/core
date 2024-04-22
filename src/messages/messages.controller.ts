import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './domain/message';

@ApiTags('Messages')
@ApiBearerAuth()
@Controller({
  path: 'messages',
  version: '1',
})
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createMessage(
    @Request() request,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messagesService.createMessage(request.user, createMessageDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  getMessageById(@Param('id') id: Message['id']) {
    return this.messagesService.getMessageById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  updateMessage(
    @Param('id') id: Message['id'],
    @Body() updateMessageDto: UpdateMessageDto,
    @Request() request,
  ) {
    return this.messagesService.updateMessage(
      request.user,
      id,
      updateMessageDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Message['id'], @Request() request) {
    return this.messagesService.softDelete(request.user, id);
  }
}
