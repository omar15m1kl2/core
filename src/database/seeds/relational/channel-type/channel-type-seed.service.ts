import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelTypeEnum } from '../../../../channel-types/channel-types.enum';
import { ChannelTypeEntity } from '../../../../channel-types/infrastructure/persistence/relational/entities/channel-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelTypeSeedService {
  constructor(
    @InjectRepository(ChannelTypeEntity)
    private repository: Repository<ChannelTypeEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: ChannelTypeEnum.shared,
          name: 'Shared',
        }),
        this.repository.create({
          id: ChannelTypeEnum.private,
          name: 'Private',
        }),
        this.repository.create({
          id: ChannelTypeEnum.direct,
          name: 'Direct',
        }),
      ]);
    }
  }
}
