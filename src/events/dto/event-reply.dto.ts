import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class EventReplyDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  data?: object;

  @IsOptional()
  error?: object;

  @IsNotEmpty()
  @IsNumber()
  seq_reply: number;
}
