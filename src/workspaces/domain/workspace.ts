import { User } from 'src/users/domain/user';
import { Channel } from '../../channels/domain/channel';

export class Workspace {
  id: number | string;
  title: string | null;
  owner: User;
  members: User[];
  channels: Channel[];
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
