import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RoomType } from '../enums/room-type.enum';
import { EventDto } from './event.dto';

class DataDto {
  @IsNotEmpty()
  room_id: number | string;

  @IsEnum(RoomType)
  room_type: RoomType;
}

export class SubscriptionDto extends EventDto {
  @ValidateNested()
  @Type(() => DataDto)
  data: DataDto;
}
