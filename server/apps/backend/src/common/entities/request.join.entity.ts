import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Organization } from './organization.entity';
import { User } from './user.entity';

@Entity('requestJoin')
class RequestJoin {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ManyToOne(() => Organization, (organization) => organization.requestJoins, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organizationId' })
  public organization: Organization;

  @ManyToOne(() => User, (user) => user.requestJoins, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column({
    nullable: false,
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public requestTime: Date;
}

export { RequestJoin };
