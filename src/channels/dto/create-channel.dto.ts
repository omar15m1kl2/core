import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ChannelTypeDto } from 'src/channel-types/dto/channel-type.dto';
import { User } from 'src/users/domain/user';
import { Workspace } from 'src/workspaces/domain/workspace';

export class CreateChannelDto {
  @ApiProperty({ example: 'My channel' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is a description' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    type: ChannelTypeDto,
  })
  @IsNotEmpty()
  @Type(() => ChannelTypeDto)
  type: ChannelTypeDto;

  @ApiProperty({
    type: [User],
  })
  @ArrayNotEmpty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => User)
  members: User[];

  @ApiProperty({
    type: Workspace,
  })
  @IsNotEmpty()
  @Type(() => Workspace)
  @ValidateNested()
  workspace: Workspace;
}
