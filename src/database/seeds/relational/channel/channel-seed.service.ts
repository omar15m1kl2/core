import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelEntity } from '../../../../channels/infrastructure/persistence/entities/channel.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { WorkspaceEntity } from 'src/workspaces/infrastructure/persistence/entities/workspace.entity';
import { ChannelTypeEnum } from 'src/channel-types/channel-types.enum';

@Injectable()
export class ChannelSeedService {
  constructor(
    @InjectRepository(ChannelEntity)
    private channelRepository: Repository<ChannelEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(WorkspaceEntity)
    private workspaceRepository: Repository<WorkspaceEntity>,
  ) {}

  async run() {
    const [user] = await this.userRepository.find({ take: 1 });
    const [workspace] = await this.userRepository.find({ take: 1 });
    const count = await this.channelRepository.count();

    if (!count && user) {
      await this.channelRepository.save([
        this.channelRepository.create({
          title: 'Channel 1',
          owner: user.id,
          workspace: workspace.id,
          description: 'General channel 1',
          createdAt: new Date(),
          type: {
            id: ChannelTypeEnum.shared,
            name: 'Shared',
          },
        }),
        this.channelRepository.create({
          title: 'Channel 2',
          owner: user.id,
          workspace: workspace.id,
          description: 'General channel 2',
          createdAt: new Date(),
          type: {
            id: ChannelTypeEnum.shared,
            name: 'Shared',
          },
        }),
      ]);
    }
  }
}
