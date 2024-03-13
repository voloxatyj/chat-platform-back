import { Injectable } from '@nestjs/common';
import { CreateConversationParams } from 'src/utils/types';

@Injectable()
export class ConversationsService {
  createConversation({
    authorId,
    recipientId,
    message,
  }: CreateConversationParams) {}
}
