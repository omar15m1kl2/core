import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Channel } from 'src/channels/domain/channel';
import { Workspace } from 'src/workspaces/domain/workspace';
import { Message } from '../domain/message';

export class CreateWorkspaceDto {
  @ApiProperty({ example: 'My workspace' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ type: Channel })
  @IsNotEmpty()
  @Type(() => Channel)
  channel: Channel;

  @ApiProperty({
    type: Workspace,
  })
  @IsNotEmpty()
  @Type(() => Workspace)
  @ValidateNested()
  workspace: Workspace;

  @ApiProperty({
    type: Message,
  })
  @IsOptional()
  @Type(() => Message)
  @ValidateNested()
  parentMessage: Message;

  @ApiProperty({
    example: 'true',
  })
  @IsNotEmpty()
  @IsBoolean()
  draft: boolean;
}
