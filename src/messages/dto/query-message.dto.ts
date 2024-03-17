import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Message } from '../domain/message';
import { Workspace } from '../../workspaces/domain/workspace';

export class FilterMessageDto {
  @ApiProperty()
  @IsOptional()
  @Type(() => Workspace['id'])
  workspaceId?: Workspace['id'] | null;

  @ApiProperty()
  @IsOptional()
  @Type(() => Message['id'])
  parentMessageId?: Message['id'] | null;

  @ApiProperty()
  @IsOptional()
  draft?: boolean;
}

export class SortMessageDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Message;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryMessageDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  cursor: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 20))
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: String, required: false, example: '{"draft":true}' })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterMessageDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterMessageDto)
  filters?: FilterMessageDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortMessageDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortMessageDto)
  sort?: SortMessageDto[] | null;
}
