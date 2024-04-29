import { IsNotEmpty, ValidateNested } from 'class-validator';
import { BroadcastDto, EventDto } from './event.dto';
import { Type } from 'class-transformer';
import { Workspace } from 'src/workspaces/domain/workspace';
import { Channel } from 'src/channels/domain/channel';

class ChannelDeletedBroadcastDto extends BroadcastDto {
  @IsNotEmpty()
  workspace_id: Workspace['id'];
}

export class ChannelDeletedDto extends EventDto {
  @IsNotEmpty()
  id: Channel['id'];

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => ChannelDeletedBroadcastDto)
  broadcast: ChannelDeletedBroadcastDto;
}
