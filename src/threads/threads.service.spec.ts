import { Test, TestingModule } from '@nestjs/testing';
import { ThreadsService } from './threads.service';
import { MessagesService } from 'src/messages/messages.service';
import { UsersService } from 'src/users/users.service';

describe('ThreadsService', () => {
  let service: ThreadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThreadsService,
        {
          provide: MessagesService,
          useValue: {},
        },
        {
          provide: UsersService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ThreadsService>(ThreadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
