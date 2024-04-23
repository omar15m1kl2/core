import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Channel } from 'src/channels/domain/channel';
import { User } from 'src/users/domain/user';
import { Workspace } from 'src/workspaces/domain/workspace';

export class BroadcastDto {
  @IsOptional()
  omit_users: User['id'][];

  @IsOptional()
  user_id: User['id'];

  @IsOptional()
  channel_id: Channel['id'];

  @IsOptional()
  workspace_id: Workspace['id'];
}

export class EventDto {
  @IsNotEmpty()
  @IsNumber()
  seq: number;

  @IsNotEmpty()
  @IsString()
  event: string;

  @ValidateNested({ each: true })
  broadcast?: BroadcastDto;
}
