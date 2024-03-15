import { ParticipantEntity } from './entities/Participant';
import { ConversationEntity } from './entities/Conversation';
import { SessionEntity } from './entities/Session';
import { UserEntity } from './entities/User';

const entities = [
  UserEntity,
  SessionEntity,
  ConversationEntity,
  ParticipantEntity,
];

export default entities;

export { ConversationEntity, ParticipantEntity, SessionEntity, UserEntity };
