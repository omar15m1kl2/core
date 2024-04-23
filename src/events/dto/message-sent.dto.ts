import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { EventDto } from './event.dto';

export class MessageSentDto extends EventDto {
  @IsNotEmpty()
  @ValidateNested()
  data: CreateMessageDto;
}
