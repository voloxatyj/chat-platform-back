import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConversationEntity, UserEntity } from 'src/utils/typeorm';
import { IConversationsService } from './conversations';
import { IUsersService } from 'src/users/users';
import { Services } from 'src/utils/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConversationParams } from 'src/utils/types';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly conversationRepository: Repository<ConversationEntity>,
    @Inject(Services.USERS)
    private readonly usersService: IUsersService,
  ) {}

  async getConversations(id: number): Promise<ConversationEntity[]> {
    return this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.creator', 'creator')
      .leftJoinAndSelect('conversation.recipient', 'recipient')
      .where('creator.id = :id', { id })
      .orWhere('recipient.id = :id', { id })
      .getMany();
  }

  async findById(id: number) {
    return this.conversationRepository.findOne({
      where: { id },
      relations: ['creator', 'recipient'],
    });
  }

  async isCreated(
    userId: number,
    recipientId: number,
  ): Promise<ConversationEntity> {
    try {
      return this.conversationRepository.findOne({
        where: [
          {
            creator: { id: userId },
            recipient: { id: recipientId },
          },
          {
            creator: { id: recipientId },
            recipient: { id: userId },
          },
        ],
      });
    } catch (error) {
      throw new HttpException(
        'Houston, we have a problem, when we try find conversation',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async createConversation(
    creator: UserEntity,
    { recipient, content }: CreateConversationParams,
  ): Promise<ConversationEntity> {
    const newConversation = await this.conversationRepository.create({
      creator,
      recipient,
    });
    const conversation = await this.conversationRepository.save(
      newConversation,
    );

    return conversation;
  }
}
