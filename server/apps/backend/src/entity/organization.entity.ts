import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { History } from './history.entity';
import { Contact } from './contact.entity';
import { RequestJoin } from './request.join.entity';
import { Role } from './role.entity';

@Entity('organization')
class Organization {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({
    nullable: false,
    length: 30,
  })
  public name: string;

  @Column({
    unique: true,
    nullable: false,
    length: 6,
  })
  public passcode: string;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  public codeCreatedTime: Date;

  @Column({
    nullable: true,
    default: '',
    length: 30,
  })
  public vtigerToken: string;

  @Column({
    nullable: true,
    default: '',
    length: 30,
  })
  public vtigerAccessKey: string;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  public vtigerLink: string;

  @Column({
    nullable: true,
    default: '',
    length: 8,
  })
  public packageKey: string;

  @Column({
    nullable: false,
    default: false,
  })
  public isPublic: boolean;

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
}

export { Organization };
