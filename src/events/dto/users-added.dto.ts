import { AddUsersToChannelDto } from 'src/channels/dto/add-users-to-channel.dto';
import { EventDto } from './event.dto';
import { Channel } from 'src/channels/domain/channel';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Workspace } from 'src/workspaces/domain/workspace';

export class UsersAddedDto extends EventDto {
  @IsNotEmpty()
  channel_id: Channel['id'];

  @IsNotEmpty()
  workspace_id: Workspace['id'];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddUsersToChannelDto)
  data: AddUsersToChannelDto;
}
