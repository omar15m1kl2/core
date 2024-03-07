import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { User } from '../../users/domain/user';
import { Message } from '../../messages/domain/message';

export class Thread {
  @ApiProperty({
    example: 1,
  })
  id: number | string;

  @Expose({ groups: ['me', 'admin'] })
  participants: User[];

  @Expose({ groups: ['me', 'admin'] })
  parentMessage: Message;
}
