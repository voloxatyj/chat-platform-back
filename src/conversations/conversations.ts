import { CreateConversationParams } from 'src/utils/types';

export interface IConversationsService {
  createConversation({
    authorId,
    recipientId,
    message,
  }: CreateConversationParams): Promise<void>;
}
