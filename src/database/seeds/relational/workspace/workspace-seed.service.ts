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
    // gets random user from the database to assign as owner of the workspace
    const [user] = await this.userRepository.find({ take: 1 });
    const count = await this.workspaceRepository.count();
    // seed only if there are no workspaces in the database and there is a user
    if (!count && user) {
      await this.workspaceRepository.save([
        this.workspaceRepository.create({
          title: 'Workspace 1',
          description: 'Workspace 1 description',
          owner: user,
          members: [user],
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ]);
    }
  }
}
