import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Message } from '../domain/message';

export class FilterMessageDto {
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
    description:
      'Message id to start from. Leave empty to use the latest message in the given channel.',
    example: 1,
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

  @ApiProperty({
    type: String,
    required: false,
    example: '{"draft": false, "parentMessageId":4}',
    default: '{draft: false, "parentMessageId": null}',
    description: 'Leave empty to use default filter.',
  })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterMessageDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterMessageDto)
  filters?: FilterMessageDto | null;

  @ApiProperty({
    type: String,
    required: false,
    example: '[{"orderBy": "id", "order":"ASC"}]',
    default: '[{"orderBy": "createdAt", "order":"DESC"}]',
    description:
      'orderBy: id, createdAt, updatedAt, etc. Leave empty to use createdAt, order: DESC.',
  })
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
