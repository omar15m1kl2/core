import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from '../entities/message.entity';
import { Repository } from 'typeorm';
import { MessageMapper } from '../mappers/message.mapper';
import { Message } from 'src/messages/domain/messages';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async create(data: Message): Promise<Message> {
    const presistenceModel = MessageMapper.toPersistence(data);
    const newEntity = await this.messageRepository.save(
      this.messageRepository.create(presistenceModel),
    );
    return MessageMapper.toDomain(newEntity);
  }
}
