import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Message } from 'src/messages/domain/message';
import { BroadcastDto, EventDto } from './event.dto';
import { Channel } from 'src/channels/domain/channel';
import { Type } from 'class-transformer';

class MessageDeletedBroadcastDto extends BroadcastDto {
  @IsNotEmpty()
  channel_id: Channel['id'];
}

export class MessageDeletedDto extends EventDto {
  @IsNotEmpty()
  id: Message['id'];

  @ValidateNested()
  @Type(() => MessageDeletedBroadcastDto)
  broadcast: MessageDeletedBroadcastDto;
}
