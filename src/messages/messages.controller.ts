import { Controller } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  // GET /messages
  getMessages() {
    return 'All messages';
  }
}
