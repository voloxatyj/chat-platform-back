import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ConversationEntity } from './Conversation';

@Entity({ name: 'participants' })
export class ParticipantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(
    () => ConversationEntity,
    (conversation) => conversation.participants,
  )
  @JoinTable()
  conversations: ConversationEntity[];
}
