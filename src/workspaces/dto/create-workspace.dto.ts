import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty({ example: 'My workspace' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is a description' })
  @IsOptional()
  @IsString()
  description: string;
}
