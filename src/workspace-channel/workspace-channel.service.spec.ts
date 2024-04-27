import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceChannelService } from './workspace-channel.service';

describe('WorkspaceChannelService', () => {
  let service: WorkspaceChannelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspaceChannelService],
    }).compile();

    service = module.get<WorkspaceChannelService>(WorkspaceChannelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
