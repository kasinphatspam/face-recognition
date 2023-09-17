import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('otp')
export class OTP {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: true })
  public code: string;

  @Column({ nullable: true })
  public topic: string;

  @Column({ nullable: true })
  public expireTime: Date;

  @ManyToOne(() => User, (user) => user.otp)
  @JoinColumn({ name: 'userId' })
  public user: User;
}
