import { User } from 'src/users/domain/user';

export class Workspace {
  id: number | string;
  title: string | null;
  owner: User;
  members: User[];
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
