import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InviteRepository } from './infrastructure/persistence/invite.repository';
import { Workspace } from 'src/workspaces/domain/workspace';
import { User } from 'src/users/domain/user';
import { inviteStatusEnum } from 'src/inviteStatuses/invite-status.enum';
import { InviteToWorkspaceDto } from 'src/workspaces/dto/invite-to-workspace.dto';
import { Invite } from './domain/invite';
import { UsersService } from 'src/users/users.service';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class InvitesService {
  constructor(
    private readonly inviteRepository: InviteRepository,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  findOne(fields: EntityCondition<Invite>): Promise<NullableType<Invite>> {
    return this.inviteRepository.findOne(fields);
  }

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

          this.mailService
            .sendWorkspaceInvite({
              to: email,
              data: {
                workspaceId: workspace.id as string,
                inviteId: invite.id as string,
              },
            })
            .catch((error) => {
              Logger.error(`Failed to send workspace invite: ${error.message}`);
            });
        })
        .catch((error) => {
          Logger.error(error);
          duplicateEmails.push(email);
        }),
    );

    await Promise.all(invitePromises);

    return { invites, invitedEmails, duplicateEmails };
  }

  async acceptInvite(inviteId) {
    const invite = await this.inviteRepository.findOne({ id: inviteId });
    if (!invite) {
      throw new NotFoundException();
    }

    const status = {
      id: inviteStatusEnum.accepted,
      name: 'Accepted',
    };

    return this.inviteRepository.update(inviteId, { status });
  }

  async getInvitesWithPagination(
    user: User,
    paginationOptions: { page: number; limit: number },
  ) {
    const inviteeUser = await this.usersService.findOne({ id: user.id });
    if (!inviteeUser) {
      throw new NotFoundException();
    }
    return this.inviteRepository.findManyWithPagination(
      inviteeUser.email,
      paginationOptions,
    );
  }
}
