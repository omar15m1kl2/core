import { ApiProperty } from '@nestjs/swagger';
import { InviteStatus } from '../domain/invite-status';
import { IsNumber } from 'class-validator';

export class InviteStatusDto implements InviteStatus {
  @ApiProperty()
  @IsNumber()
  id: number;
}
