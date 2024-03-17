import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsService } from './channels.service';
import { ChannelRepository } from './infrastructure/persistence/channel.repository';
import { ChannelRelationalRepository } from './infrastructure/persistence/repositories/channel.repository';
import { UsersService } from '../users/users.service';
import { MessagesService } from '../messages/messages.service';

describe('ChannelsService', () => {
  let service: ChannelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelsService,
        {
          provide: ChannelRepository,
          useValue: ChannelRelationalRepository,
        },
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: MessagesService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ChannelsService>(ChannelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
