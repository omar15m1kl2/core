import { Injectable } from '@nestjs/common';
import { FilterUserDto, SortUserDto } from '../users/dto/query-user.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/domain/user';

@Injectable()
export class ThreadsService {
  constructor(private readonly userService: UsersService) {}

  async getThreadUsers({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    return this.userService.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }
}
