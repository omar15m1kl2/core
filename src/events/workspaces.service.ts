import { Injectable } from '@nestjs/common';
import { WorkspacesService } from 'src/workspaces/workspaces.service';
import { WorkspaceUpdatedDto } from './dto/workspace-updated.dto';
import { EventReplyDto } from './dto/event-reply.dto';
import { RoomType } from './enums/room-type.enum';

@Injectable()
export class WorkspacesEventService {
  constructor(private readonly workspacesService: WorkspacesService) {}
  async workspaceUpdated(
    client: any,
    payload: WorkspaceUpdatedDto,
  ): Promise<EventReplyDto> {
    const workspace = await this.workspacesService.updateWorkspace(
      payload.broadcast.workspace_id,
      client.user,
      payload.data,
    );

    if (!workspace) {
      return {
        status: 'FAILED',
        error: {
          id: '500',
          message: 'Internal Server Error',
        },
        seq_reply: payload.seq,
      };
    }

    client
      .to(RoomType.Workspace + payload.broadcast.workspace_id)
      .emit(payload.event, workspace);

    return {
      status: 'OK',
      data: { workspace },
      seq_reply: payload.seq,
    };
  }
}
