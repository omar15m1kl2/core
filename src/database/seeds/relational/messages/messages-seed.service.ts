import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from '../../../../messages/infrastructure/presistence/entities/message.entity';
import { Repository } from 'typeorm';
import { WorkspaceEntity } from 'src/workspaces/infrastructure/persistence/entities/workspace.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class MessagesSeedService {
  constructor(
    @InjectRepository(WorkspaceEntity)
    private workspaceRepository: Repository<WorkspaceEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(MessageEntity)
    private repository: Repository<MessageEntity>,
    //TODO: edit to channel
  ) {}

  async run() {
    // create a user, a workspace, a channel, and a message
    // const [user] = await this.userRepository.find({ take: 1 });
    // const [workspace] = await this.workspaceRepository.find({ take: 1 });
  }
}
