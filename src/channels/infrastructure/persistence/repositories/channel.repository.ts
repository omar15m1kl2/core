import { InjectRepository } from '@nestjs/typeorm';
import { ChannelEntity } from '../entities/channel.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ChannelMapper } from '../mappers/channel.mapper';
import { Channel } from 'src/channels/domain/channel';
import { Injectable } from '@nestjs/common';
import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { loadRelationships } from 'src/utils/load-relationships';
import { User } from 'src/users/domain/user';

@Injectable()
export class ChannelRelationalRepository {
  constructor(
    @InjectRepository(ChannelEntity)
    private readonly channelRepository: Repository<ChannelEntity>,
  ) {}

  async create(data: Channel): Promise<Channel> {
    const persistenceModel = ChannelMapper.toPersistence(data);
    const newEntity = await this.channelRepository.save(
      this.channelRepository.create(persistenceModel),
    );
    return ChannelMapper.toDomain(newEntity);
  }

  async findOne(
    fields: EntityCondition<Channel>,
  ): Promise<NullableType<Channel>> {
    const entity = await this.channelRepository.findOne({
      where: fields as FindOptionsWhere<ChannelEntity>,
    });
    return entity ? ChannelMapper.toDomain(entity) : null;
  }

  async checkUserMembership(
    channelId: Channel['id'],
    memberId: User['id'],
  ): Promise<NullableType<Channel>> {
    return this.channelRepository.findOne({
      where: {
        id: channelId as number,
        members: {
          id: memberId as number,
        },
      },
    });
  }

  async update(id: Channel['id'], payload: Partial<Channel>): Promise<Channel> {
    const entity = await this.channelRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Channel not found');
    }

    await loadRelationships(this.channelRepository, ['workspace'], [entity]);
    const updatedChannel = await this.channelRepository.save(
      this.channelRepository.create(
        ChannelMapper.toPersistence({
          ...ChannelMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ChannelMapper.toDomain(updatedChannel);
  }

  async softDelete(id: Channel['id']): Promise<void> {
    await this.channelRepository.softDelete(id);
  }
}
