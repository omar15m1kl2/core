import { IsNotEmpty } from 'class-validator';
import { Message } from 'src/messages/domain/message';
import { EventDto } from './event.dto';
import { Channel } from 'src/channels/domain/channel';

export class MessageDeletedDto extends EventDto {
  @IsNotEmpty()
  id: Message['id'];

  @IsNotEmpty()
  channelId: Channel['id'];
}
