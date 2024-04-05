import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { WorkspaceEntity } from '../entities/workspace.entity';

@EventSubscriber()
export class MessageSubscriber
  implements EntitySubscriberInterface<WorkspaceEntity>
{
  listenTo() {
    return WorkspaceEntity;
  }

  async afterInsert(event: InsertEvent<WorkspaceEntity>) {
    const channal = {
      title: 'general',
      description: 'This is a general channal',
      owner: event.entity.owner,
      members: event.entity.members,
      workspace: event.entity,
    };

    await event.manager.save('channel', channal);
  }
}
