import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  BaseEntity,
} from 'typeorm';
import { ProfileEntity } from '../profile/profile.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: 'user' })
  role: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile: ProfileEntity;
}
