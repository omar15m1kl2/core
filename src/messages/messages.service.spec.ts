import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { MessageRelationalRepository } from './infrastructure/presistence/repositories/message.repository';
import { MessageRepository } from './infrastructure/presistence/message.repository';

describe('MessagesService', () => {
  let service: MessagesService;
  let messageRepository: MessageRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: MessageRepository,
          useValue: MessageRelationalRepository,
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    messageRepository = module.get<MessageRepository>(MessageRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(messageRepository).toBeDefined();
  });
});
