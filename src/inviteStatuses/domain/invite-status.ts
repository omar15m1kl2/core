import { Allow } from 'class-validator';

export class InviteStatus {
  @Allow()
  id: number;

  @Allow()
  name?: string;
}
