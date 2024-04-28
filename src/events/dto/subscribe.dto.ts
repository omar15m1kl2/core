import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RoomType } from '../enums/room-type.enum';
import { EventDto } from './event.dto';

class DataDto {
  room_id: number | string;

  @IsEnum(RoomType)
  room_type: RoomType;
}

export class SubscribeDto extends EventDto {
  @ValidateNested()
  @Type(() => DataDto)
  data: DataDto;
}
