import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { UsersService } from '../users/users.service';
import { ChannelRepository } from './infrastructure/persistence/channel.repository';
import { MessagesService } from '../messages/messages.service';

describe('ChannelsController', () => {
  let controller: ChannelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelsController],
      providers: [
        ChannelsService,
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: ChannelRepository,
          useValue: {},
        },
        {
          provide: MessagesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ChannelsController>(ChannelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
