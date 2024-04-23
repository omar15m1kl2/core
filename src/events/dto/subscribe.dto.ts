import { EventDto } from './event.dto';

export class SubscribeDto extends EventDto {
  data: {
    room_id: number | string;
    room_type: 'channel' | 'workspace' | 'user';
  };
}
