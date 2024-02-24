import { Workspace } from 'src/workspaces/domain/workspace';
import { WorkspaceEntity } from 'src/workspaces/infrastructure/persistence/entities/workspace.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';

export class WorkspaceMapper {
  static toDomain(raw: WorkspaceEntity): Workspace {
    const workspace = new Workspace();
    workspace.id = raw.id;
    workspace.title = raw.title;
    workspace.description = raw.description;
    if (raw.owner) {
      workspace.owner = UserMapper.toDomain(raw.owner);
    }
    workspace.members = raw.members;
    workspace.createdAt = raw.createdAt;
    workspace.updatedAt = raw.updatedAt;
    workspace.deletedAt = raw.deletedAt;
    return workspace;
  }

  static toPersistence(workspace: Workspace): WorkspaceEntity {
    const owner = new UserEntity();
    owner.id = Number(workspace.owner.id);

    const members = workspace.members.map((member) => {
      const user = new UserEntity();
      user.id = Number(member.id);
      return user;
    });

    const workspaceEntity = new WorkspaceEntity();
    if (workspace.id && typeof workspace.id === 'number') {
      workspaceEntity.id = workspace.id;
    }
    workspaceEntity.title = workspace.title;
    workspaceEntity.description = workspace.description;
    workspaceEntity.owner = owner;
    workspaceEntity.members = members;
    workspaceEntity.createdAt = workspace.createdAt;
    workspaceEntity.updatedAt = workspace.updatedAt;
    workspaceEntity.deletedAt = workspace.deletedAt;
    return workspaceEntity;
  }
}
