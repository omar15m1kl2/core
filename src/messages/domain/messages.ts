import { User } from 'src/users/domain/user';
import { Workspace } from 'src/workspaces/domain/workspace';

export class Message {
  id: number | string;
  content: string;
  senderId: User;
  // channelId: Channel; //TODO: edit to channel
  channelId: number | string;
  createdAt: Date;
  workspaceId: Workspace;
  parentMessageId: Message;
}
