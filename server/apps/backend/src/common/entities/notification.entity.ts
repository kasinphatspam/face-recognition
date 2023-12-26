import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('notification')
class Notification {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({
    nullable: false,
  })
  public title: string;

  @Column({
    nullable: false,
  })
  public description: string;

  @ManyToOne(() => User, (user) => user.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  public user: User;
}

export { Notification };
