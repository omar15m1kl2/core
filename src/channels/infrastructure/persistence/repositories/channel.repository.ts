import { InjectRepository } from '@nestjs/typeorm';
import { ChannelEntity } from '../entities/channel.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ChannelMapper } from '../mappers/channel.mapper';
import { Channel } from 'src/channels/domain/channel';
import { Injectable } from '@nestjs/common';
import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import { Message } from '../../../../messages/domain/messages';

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

  async findMessagesWithPagination(
    id: Channel['id'],
    paginationOptions: IPaginationOptions,
  ): Promise<Message[]> {
    const channel = await this.channelRepository.findOne({
      where: { id: id as number },
      relations: {
        messages: true,
      },
    });

    if (!channel) {
      throw new Error('Channel not found');
    }

    const channels = channel.messages.slice(
      (paginationOptions.page - 1) * paginationOptions.limit,
      paginationOptions.page * paginationOptions.limit,
    );

    return channels;
  }

  async softDelete(id: Channel['id']): Promise<void> {
    await this.channelRepository.softDelete(id);
  }
}
