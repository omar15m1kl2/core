import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { User } from 'src/users/domain/user';
import { Channel } from '../../channels/domain/channel';
import { Invite } from 'src/invites/domain/invite';

export class Workspace {
  @ApiProperty({ example: 1 })
  @IsDefined()
  id: number | string;
  title: string | null;
  owner: User;
  members: User[];
  channels: Channel[];
  invites: Invite[];
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
