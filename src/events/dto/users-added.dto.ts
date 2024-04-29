import { AddUsersToChannelDto } from 'src/channels/dto/add-users-to-channel.dto';
import { BroadcastDto, EventDto } from './event.dto';
import { Channel } from 'src/channels/domain/channel';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Workspace } from 'src/workspaces/domain/workspace';

class BroadcastUsersAddedDto extends BroadcastDto {
  @IsNotEmpty()
  channel_id: Channel['id'];

  @IsNotEmpty()
  workspace_id: Workspace['id'];
}

export class UsersAddedDto extends EventDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddUsersToChannelDto)
  data: AddUsersToChannelDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BroadcastUsersAddedDto)
  broadcast: BroadcastUsersAddedDto;
}
