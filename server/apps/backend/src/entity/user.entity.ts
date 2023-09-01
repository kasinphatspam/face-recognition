import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import * as dotenv from 'dotenv';
import { Organization } from './organization.entity';
import { Role } from './role.entity';
import { History } from './history.entity';
import { RequestJoin } from './request.join.entity';

dotenv.config();
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({
    nullable: false,
    length: 30,
  })
  public firstname: string;

  @Column({
    nullable: false,
    length: 30,
  })
  public lastname: string;

  @Column({
    unique: true,
    nullable: false,
    length: 50,
  })
  public email: string;

  @Column({
    nullable: false,
    length: 100,
    select: false,
  })
  public password: string;

  @Column({
    nullable: true,
    length: 10,
  })
  public gender: string;

  @Column({
    unique: true,
    nullable: false,
    length: 13,
  })
  public personalId: string;

  @Column({
    nullable: true,
    type: 'date',
  })
  public dob: Date;

  @Column({
    nullable: false,
    length: 255,
    default: `${process.env.BACKEND_URL}/images/users/default.png`,
  })
  public image: string;

  @ManyToOne(() => Organization, (organization) => organization.users)
  public organization: Organization;

  @ManyToOne(() => Role, (role) => role.users)
  public role: Role;

  @OneToMany(() => History, (history) => history.organization)
  public histories: History[];

  @OneToMany(() => RequestJoin, (requestJoin) => requestJoin.user)
  public requestJoins: RequestJoin[];

  public getFullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }
}
