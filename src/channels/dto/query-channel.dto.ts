import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type, plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Channel } from 'diagnostics_channel';
import { User } from 'src/users/domain/user';
import { Workspace } from 'src/workspaces/domain/workspace';

export class FilterChannelDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Workspace)
  workspaceId?: Workspace['id'] | null;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => User)
  userId?: User['id'] | null;
}

export class SortChannelDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Channel;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryChannelDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterChannelDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterChannelDto)
  filters?: FilterChannelDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortChannelDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortChannelDto)
  sort?: SortChannelDto[] | null;
}
