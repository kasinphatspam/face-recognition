import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from './organization.entity';
import { User } from './user.entity';

@Entity('history')
class History {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ManyToOne(() => Organization, (organization) => organization.histories)
  public organization: Organization;

  @ManyToOne(() => User, (user) => user.histories)
  public user: User;

  @Column({
    nullable: false,
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public detectedTime: Date;
}

export { History };
