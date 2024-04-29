import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateChannelDto } from 'src/channels/dto/create-channel.dto';
import { EventDto } from './event.dto';
import { Type } from 'class-transformer';

export class ChannelCreatedDto extends EventDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateChannelDto)
  data: CreateChannelDto;
}
