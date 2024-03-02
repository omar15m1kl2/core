import { InjectRepository } from '@nestjs/typeorm';
import { ChannelEntity } from '../entities/channel.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ChannelMapper } from '../mappers/channel.mapper';
import { Channel } from 'src/channels/domain/channel';
import { Injectable } from '@nestjs/common';
import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { UpdateChannelDto } from 'src/channels/dto/update-channel.dto';

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

  async update(id: Channel['id'], data: UpdateChannelDto): Promise<Channel> {
    await this.channelRepository.update(id, data);
    const updatedEntity = await this.channelRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!updatedEntity) {
      throw new Error('Entity not found');
    }

    const updatedChannel = await this.channelRepository.save(
      this.channelRepository.create(
        ChannelMapper.toPersistence({
          ...ChannelMapper.toDomain(updatedEntity),
          ...data,
        }),
      ),
    );

    return ChannelMapper.toDomain(updatedChannel);
  }

  async softDelete(id: Channel['id']): Promise<void> {
    await this.channelRepository.softDelete(id);
  }
}
