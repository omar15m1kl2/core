import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdateMessageDto {
  @ApiProperty({ example: 'New message' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content?: string;

  @ApiProperty({
    example: 'true',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  draft?: boolean;
}
