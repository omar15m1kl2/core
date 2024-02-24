import { ApiProperty } from '@nestjs/swagger';
import { ChannelType } from '../domain/channel-type';
import { IsNumber } from 'class-validator';

export class ChannelTypeDto implements ChannelType {
  @ApiProperty()
  @IsNumber()
  id: number;
}
