import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { User } from 'src/users/domain/user';

export class Workspace {
  @ApiProperty({ example: 1 })
  @IsDefined()
  id: number | string;
  title: string | null;
  owner: User;
  members: User[];
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
