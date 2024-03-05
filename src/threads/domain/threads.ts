import { Message } from 'src/messages/domain/messages';
import { User } from 'src/users/domain/user';

export class Thread {
  participate: User;
  parentMessage: Message;
}
