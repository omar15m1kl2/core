import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { User } from 'src/users/domain/user';

export class AddUsersToChannelDto {
  @ApiProperty({
    type: [User],
  })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => User)
  users: User[];
}
