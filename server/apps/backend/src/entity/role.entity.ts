import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
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

  @ManyToOne(() => Organization, (organization) => organization.roles)
  public organization: Organization;

  @ManyToMany(() => Permission)
  @JoinTable()
  public permissions: Permission[];

  @OneToMany(() => User, (user) => user.role)
  public users: User[];
}

export { Role };
