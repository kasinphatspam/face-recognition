import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { History } from './history.entity';
import { Contact } from './contact.entity';
import { RequestJoin } from './request.join.entity';
import { Role } from './role.entity';
import { Plan } from './plan.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('organization')
class Organization {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    length: 30,
  })
  public name: string;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: false,
    length: 6,
  })
  public passcode: string;

  @ApiProperty()
  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public codeCreatedTime: Date;

  @ApiProperty()
  @Column({
    nullable: true,
    default: '',
    length: 30,
  })
  public vtigerToken: string;

  @ApiProperty()
  @Column({
    nullable: true,
    default: '',
    length: 30,
  })
  public vtigerAccessKey: string;

  @ApiProperty()
  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  public vtigerLink: string;

  @ApiProperty()
  @Column({
    nullable: true,
    default: '',
    length: 10,
  })
  public packageKey: string;

  @ApiProperty()
  @Column({
    nullable: false,
    default: false,
  })
  public isPublic: boolean;

  @ApiProperty()
  @Column({
    nullable: false,
    default: '',
  })
  public description: string;

  @OneToMany(() => User, (user) => user.organization)
  public users: User[];

  @OneToMany(() => Role, (role) => role.organization)
  public roles: Role[];

  @OneToMany(() => History, (history) => history.organization)
  public histories: History[];

  @OneToMany(() => Contact, (contact) => contact.organization)
  public contacts: Contact[];

  @OneToMany(() => RequestJoin, (requestJoin) => requestJoin.organization)
  public requestJoins: RequestJoin[];

  @ManyToOne(() => Plan, (plan) => plan.organizations)
  @JoinColumn({ name: 'planId' })
  public plan: Plan;
}

export { Organization };
