import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InviteRepository } from './infrastructure/persistence/invite.repository';
import { Workspace } from 'src/workspaces/domain/workspace';
import { User } from 'src/users/domain/user';
import { inviteStatusEnum } from 'src/inviteStatuses/invite-status.enum';
import { InviteToWorkspaceDto } from 'src/workspaces/dto/invite-to-workspace.dto';

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
    const duplicates = await this.inviteRepository.findManyByEmails(emails);
    const duplicateEmails = duplicates.map(
      (duplicate) => duplicate.invitee_email,
    );
    if (duplicates.length) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Duplicate email(s) found',
          duplicateEmails,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const invites = emails.map((invitee_email) => {
      return {
        workspace,
        sender,
        invitee_email,
        status,
      };
    });
    return this.inviteRepository.create(invites);
  }
}
