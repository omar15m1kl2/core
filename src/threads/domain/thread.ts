import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Message } from 'src/messages/domain/messages';
import { User } from 'src/users/domain/user';

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
