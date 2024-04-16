import { Injectable, Logger } from '@nestjs/common';
import { InviteRepository } from './infrastructure/persistence/invite.repository';
import { Workspace } from 'src/workspaces/domain/workspace';
import { User } from 'src/users/domain/user';
import { inviteStatusEnum } from 'src/inviteStatuses/invite-status.enum';
import { InviteToWorkspaceDto } from 'src/workspaces/dto/invite-to-workspace.dto';
import { Invite } from './domain/invite';

@Injectable()
export class InvitesService {
  constructor(private readonly inviteRepository: InviteRepository) {}

  async inviteToWorkspace(
    workspace: Workspace,
    sender: User,
    emails: InviteToWorkspaceDto['emails'],
  ) {
    const status = {
      id: inviteStatusEnum.pending,
      name: 'Pending',
    };

    const invitedEmails: string[] = [];
    const duplicateEmails: string[] = [];
    const invites: Invite[] = [];

    const invitePromises = emails.map((email) =>
      this.inviteRepository
        .create({
          workspace,
          sender,
          invitee_email: email,
          status,
        })
        .then((invite) => {
          invitedEmails.push(email);
          invites.push(invite);
        })
        .catch((error) => {
          Logger.error(error);
          duplicateEmails.push(email);
        }),
    );

    await Promise.all(invitePromises);

    return { invites, invitedEmails, duplicateEmails };
  }
}
