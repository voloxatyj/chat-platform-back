import { ParticipantEntity } from './entities/Participant';
import { ConversationEntity } from './entities/Conversation';
import { SessionEntity } from './entities/Session';
import { UserEntity } from './entities/User';
import { MessageEntity } from './entities/Message';

const entities = [
  UserEntity,
  SessionEntity,
  ConversationEntity,
  ParticipantEntity,
  MessageEntity,
];

export default entities;

export {
  ConversationEntity,
  ParticipantEntity,
  SessionEntity,
  UserEntity,
  MessageEntity,
};
