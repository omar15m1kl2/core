import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InviteStatusEntity } from 'src/inviteStatuses/infrastructure/persistence/relational/entities/invite-status.entity';
import { inviteStatusEnum } from 'src/inviteStatuses/invite-status.enum';
import { Repository } from 'typeorm';

@Injectable()
export class InviteStatusSeedService {
  constructor(
    @InjectRepository(InviteStatusEntity)
    private repository: Repository<InviteStatusEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: inviteStatusEnum.pending,
          name: 'Pending',
        }),
        this.repository.create({
          id: inviteStatusEnum.accepted,
          name: 'Accepted',
        }),
        this.repository.create({
          id: inviteStatusEnum.revoked,
          name: 'Revoked',
        }),
      ]);
    }
  }
}
