import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';
import { UsersService } from '../users/users.service';
import { WorkspaceRepository } from './infrastructure/persistence/workspace.repository';
import { MessagesService } from 'src/messages/messages.service';

describe('WorkspacesController', () => {
  let controller: WorkspacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspacesController],
      providers: [
        WorkspacesService,
        {
          provide: WorkspaceRepository,
          useValue: {},
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

    controller = module.get<WorkspacesController>(WorkspacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
