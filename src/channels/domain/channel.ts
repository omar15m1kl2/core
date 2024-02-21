import { ChannelType } from '../../channel-types/domain/channel-type';

export class Channel {
  id: number | string;

  owner: number;

  title: string | null;

  description: string | null;

  type?: ChannelType;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  workspace: number | string;
}
