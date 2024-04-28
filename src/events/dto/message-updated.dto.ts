import { IsNotEmpty, ValidateNested } from 'class-validator';
import { UpdateMessageDto } from 'src/messages/dto/update-message.dto';
import { EventDto } from './event.dto';
import { Message } from 'src/messages/domain/message';

export class MessageUpdatedDto extends EventDto {
  @IsNotEmpty()
  id: Message['id'];

  @IsNotEmpty()
  @ValidateNested()
  data: UpdateMessageDto;
}
