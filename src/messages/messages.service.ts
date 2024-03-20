import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IConversationsService } from 'src/conversations/conversations';
import { ConversationNotFoundException } from 'src/conversations/exceptions/ConversationNotFound';
import { Services } from 'src/utils/constants';
import { MessageEntity } from 'src/utils/typeorm';
import { CreateMessageParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { CannotCreateMessageException } from './exceptions/CannotCreateMessage';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messagesRepository: Repository<MessageEntity>,
    @Inject(Services.CONVERSATIONS)
    private readonly conversationService: IConversationsService,
  ) {}
  async createMessage(params: CreateMessageParams) {
    const { user, content, id } = params;
    const conversation = await this.conversationService.findById(id);

    if (!conversation) throw new ConversationNotFoundException();

    const { creator, recipient } = conversation;

    if (creator.id !== user.id && recipient.id !== user.id)
      throw new CannotCreateMessageException();

    try {
      const message = this.messagesRepository.create({
        content,
        conversation,
        author: instanceToPlain(user),
      });

      const savedMessage = await this.messagesRepository.save(message);
      conversation.lastMessageSent = savedMessage;

      return { message: savedMessage };
    } catch (error) {
      throw new CannotCreateMessageException();
    }
  }

  getMessages(conversationId: number): Promise<MessageEntity[]> {
    return this.messagesRepository.find({
      relations: ['author'],
      where: { conversation: { id: conversationId } },
      order: { created_at: 'DESC' },
    });
  }
}
