import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsEmail } from 'class-validator';

export class InviteToWorkspaceDto {
  @ApiProperty({ example: ['test1@example.com'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsEmail({}, { each: true })
  emails: string[];
}
