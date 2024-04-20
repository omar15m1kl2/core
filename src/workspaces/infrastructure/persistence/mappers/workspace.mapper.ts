import { Workspace } from 'src/workspaces/domain/workspace';
import { WorkspaceEntity } from 'src/workspaces/infrastructure/persistence/entities/workspace.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';
import { FileMapper } from 'src/files/infrastructure/persistence/relational/mappers/file.mapper';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';

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
    if (raw.photo) {
      workspace.photo = FileMapper.toDomain(raw.photo);
    }
    workspace.createdAt = raw.createdAt;
    workspace.updatedAt = raw.updatedAt;
    workspace.deletedAt = raw.deletedAt;
    return workspace;
  }

  static toPersistence(workspace: Workspace): WorkspaceEntity {
    const owner = new UserEntity();
    owner.id = Number(workspace.owner.id);

    const members = workspace.members?.map((member) => {
      const user = new UserEntity();
      user.id = Number(member.id);
      return user;
    });

    const workspaceEntity = new WorkspaceEntity();
    if (workspace.id && typeof workspace.id === 'number') {
      workspaceEntity.id = workspace.id;
    }

    let photo: FileEntity | undefined = undefined;

    if (workspace.photo) {
      photo = new FileEntity();
      photo.id = workspace.photo.id;
      photo.path = workspace.photo.path;
    }
    workspaceEntity.title = workspace.title;
    workspaceEntity.description = workspace.description;
    workspaceEntity.owner = owner;
    workspaceEntity.members = members;
    workspaceEntity.photo = photo;
    workspaceEntity.createdAt = workspace.createdAt;
    workspaceEntity.updatedAt = workspace.updatedAt;
    workspaceEntity.deletedAt = workspace.deletedAt;
    return workspaceEntity;
  }
}
