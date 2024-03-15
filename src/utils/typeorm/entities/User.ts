import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ParticipantEntity } from './Participant';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  user_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  avatar: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @OneToOne(() => ParticipantEntity, { cascade: ['insert', 'update'] })
  @JoinColumn()
  participant: ParticipantEntity;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  // @OneToMany(() => Message, (message) => message.author)
  // @JoinColumn()
  // messages: Message[];

  // @ManyToMany(() => Group, (group) => group.users)
  // groups: Group[];

  // @OneToOne(() => Profile, { cascade: ['insert', 'update'] })
  // @JoinColumn()
  // profile: Profile;

  // @OneToOne(() => UserPresence, { cascade: ['insert', 'update'] })
  // @JoinColumn()
  // presence: UserPresence;

  // @OneToOne(() => Peer, (peer) => peer.user, {
  //   cascade: ['insert', 'remove', 'update'],
  // })
  // @JoinColumn()
  // peer: Peer;
}
