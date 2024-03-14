import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesService } from './workspaces.service';
import { WorkspaceRepository } from './infrastructure/persistence/workspace.repository';
import { WorkspaceRelationalRepository } from './infrastructure/persistence/repositories/workspace.repository';
import { UsersService } from '../users/users.service';
import { MessagesService } from '../messages/messages.service';

describe('WorkspacesService', () => {
  let service: WorkspacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspacesService,
        {
          provide: WorkspaceRepository,
          useValue: WorkspaceRelationalRepository,
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

    service = module.get<WorkspacesService>(WorkspacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
