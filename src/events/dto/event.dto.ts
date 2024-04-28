import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Channel } from 'src/channels/domain/channel';
import { User } from 'src/users/domain/user';
import { Workspace } from 'src/workspaces/domain/workspace';

export class BroadcastDto {
  omit_users: User['id'][];

  user_id: User['id'];

  channel_id: Channel['id'];

  workspace_id: Workspace['id'];
}

export class EventDto {
  @IsNotEmpty()
  @IsNumber()
  seq: number;

  @IsNotEmpty()
  @IsString()
  event: string;

  @ValidateNested()
  broadcast: BroadcastDto;
}
