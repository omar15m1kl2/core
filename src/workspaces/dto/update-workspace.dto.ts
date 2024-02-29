import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateWorkspaceDto {
  @ApiProperty({ example: 'My workspace' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is a description' })
  @IsOptional()
  @IsString()
  description: string;
}
