import { ConversationEntity, MessageEntity, UserEntity } from './typeorm';

export type CreateUserDetails = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  user_name: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
  user_name: string;
}>;

export type FindUserOptions = Partial<{
  selectAll: boolean;
}>;

export type CreateConversationParams = {
  recipient: UserEntity;
  content: string;
};

export type ConversationIdentityType = 'author' | 'recipient';

export type FindParticipantParams = Partial<{
  id: number;
}>;

export type CreateParticipantParams = {
  id: number;
};

export interface AuthenticatedRequest extends Request {
  user: UserEntity;
}

export type CreateMessageParams = {
  id: number;
  content?: string;
  user: UserEntity;
};

export type CreateMessageResponse = {
  message: MessageEntity;
  conversation: ConversationEntity;
};

export type DeleteMessageParams = {
  userId: number;
  conversationId: number;
  messageId: number;
};

export type FindMessageParams = {
  userId: number;
  conversationId: number;
  messageId: number;
};

export type EditMessageParams = {
  conversationId: number;
  messageId: number;
  userId: number;
  content: string;
};
