import { ConversationEntity, UserEntity } from 'src/utils/typeorm';
import { CreateConversationParams } from 'src/utils/types';

export interface IConversationsService {
  createConversation(
    creator: UserEntity,
    { recipient, content }: CreateConversationParams,
  ): Promise<ConversationEntity>;
  getConversations(id: number): Promise<ConversationEntity[]>;
  findById(id: number): Promise<ConversationEntity | undefined>;
  isCreated(
    userId: number,
    recipientId: number,
  ): Promise<ConversationEntity | undefined>;
}
