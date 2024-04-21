import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FileDto } from 'src/files/dto/file.dto';

export class UpdateWorkspaceDto {
  @ApiProperty({ example: 'My workspace' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is a description' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;
}
