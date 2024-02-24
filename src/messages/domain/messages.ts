import { Channel } from 'src/channels/domain/channel';
import { User } from 'src/users/domain/user';
import { Workspace } from 'src/workspaces/domain/workspace';

export class Message {
  id: number | string;
  content: string;
  sender: User;
  channel: Channel;
  createdAt: Date;
  workspace: Workspace;
  parentMessage: Message;
}
