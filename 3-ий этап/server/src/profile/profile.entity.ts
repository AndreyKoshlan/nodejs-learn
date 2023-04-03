import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UserEntity } from '../user/user.entity';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  selfDescription?: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn()
  user: UserEntity;
}
