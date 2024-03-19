import {
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ParticipantEntity } from './Participant';
import { UserEntity } from './User';
import { MessageEntity } from './Message';

@Entity({ name: 'conversations' })
@Index(['creator.id', 'recipient.id'], { unique: true })
export class ConversationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @JoinColumn()
  creator: UserEntity;

  @OneToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @JoinColumn()
  recipient: UserEntity;

  @ManyToMany(
    () => ParticipantEntity,
    (participant) => participant.conversations,
  )
  participants: ParticipantEntity[];

  @OneToMany(() => MessageEntity, (message) => message.conversation, {
    cascade: ['insert', 'remove', 'update'],
  })
  @JoinColumn()
  messages: MessageEntity[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @OneToOne(() => MessageEntity)
  @JoinColumn({ name: 'last_message_sent' })
  lastMessageSent: MessageEntity;

  @UpdateDateColumn({ name: 'updated_at' })
  lastMessageSentAt: Date;
}
