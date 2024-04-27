import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceChannelController } from './workspace-channel.controller';
import { WorkspaceChannelService } from './workspace-channel.service';

describe('WorkspaceChannelController', () => {
  let controller: WorkspaceChannelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspaceChannelController],
      providers: [WorkspaceChannelService],
    }).compile();

    controller = module.get<WorkspaceChannelController>(
      WorkspaceChannelController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
