import { InjectRepository } from '@nestjs/typeorm';
import { ChannelEntity } from '../entities/channel.entity';
import { Repository } from 'typeorm';
import { ChannelMapper } from '../mappers/channel.mapper';
import { Channel } from 'src/channels/domain/channel';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChannelRepository {
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
}
