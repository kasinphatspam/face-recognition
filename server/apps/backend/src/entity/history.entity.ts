import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Organization } from './organization.entity';
import { User } from './user.entity';
import { RecognitionImageResponseDto } from '@/utils/dtos/contact.dto';

@Entity('history')
class History {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ManyToOne(() => Organization, (organization) => organization.histories)
  @JoinColumn({ name: 'organizationId' })
  public organization: Organization;

  @ManyToOne(() => User, (user) => user.histories)
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column({
    nullable: false,
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public detectedTime: Date;

  public result: RecognitionImageResponseDto[];
}

export { History };
