import { Allow } from 'class-validator';

export class ChannelType {
  @Allow()
  id: number;

  @Allow()
  name?: string;
}
