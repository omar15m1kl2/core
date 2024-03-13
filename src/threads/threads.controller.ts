import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { QueryUserDto } from 'src/users/dto/query-user.dto';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { ThreadsService } from './threads.service';

@ApiTags('Threads')
@Controller({
  path: 'threads',
  version: '1',
})
export class ThreadsController {
  constructor(private readonly service: ThreadsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id/users')
  @ApiParam({
    name: 'id',
    description: 'Parent message Id',
  })
  @HttpCode(HttpStatus.OK)
  async getThreadUsers(@Param('id') id: string, @Query() query: QueryUserDto) {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.service.getThreadUsers({
        filterOptions: {
          parentMessageId: id,
          ...query?.filters,
        },
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }
}
