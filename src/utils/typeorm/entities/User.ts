import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ select: false })
  @Exclude()
  password: string;

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
