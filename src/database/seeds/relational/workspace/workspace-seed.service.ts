import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkspaceEntity } from 'src/workspaces/infrastructure/persistence/entities/workspace.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class WorkspaceSeedService {
  constructor(
    @InjectRepository(WorkspaceEntity)
    private workspaceRepository: Repository<WorkspaceEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async run() {
    // find all users LIMIT 1
    console.log('Workspace seed running...');
    const [user] = await this.userRepository.find({ take: 1 });
    const count = await this.workspaceRepository.count();
    if (!count && user) {
      await this.workspaceRepository.save([
        this.workspaceRepository.create({
          title: 'Workspace 1',
          description: 'Workspace 1 description',
          owner: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
        this.workspaceRepository.create({
          title: 'Workspace 2',
          description: 'Workspace 2 description',
          owner: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ]);
    }
  }
}
