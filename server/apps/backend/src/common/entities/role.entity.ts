import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Organization } from './organization.entity';

@Entity('role')
class Role {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({
    nullable: false,
    length: 30,
  })
  public name: string;

  @ManyToOne(() => Organization, (organization) => organization.roles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organizationId' })
  public organization: Organization;

  @OneToMany(() => User, (user) => user.role)
  public users: User[];
}

export { Role };
