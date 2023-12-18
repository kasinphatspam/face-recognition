import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import * as dotenv from 'dotenv';
import { Organization } from './organization.entity';
import { Role } from './role.entity';
import { History } from './history.entity';
import { RequestJoin } from './request.join.entity';
import { OTP } from './otp.entity';
import { ApiProperty } from '@nestjs/swagger';

dotenv.config();
@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    length: 30,
  })
  public firstname: string;

  @ApiProperty()
  @Column({
    nullable: false,
    length: 30,
  })
  public lastname: string;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: false,
    length: 50,
  })
  public email: string;

  @ApiProperty()
  @Column({
    nullable: false,
    length: 100,
    select: false,
  })
  public password: string;

  @ApiProperty()
  @Column({
    nullable: true,
    length: 10,
  })
  public gender: string;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: false,
    length: 13,
  })
  public personalId: string;

  @ApiProperty()
  @Column({
    nullable: true,
    type: 'date',
  })
  public dob: Date;

  @ApiProperty()
  @Column({
    nullable: false,
    length: 255,
    default: `${process.env.BACKEND_URL}/images/users/default.png`,
  })
  public image: string;

  @ManyToOne(() => Organization, (organization) => organization.users, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'organizationId' })
  public organization: Organization;

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'roleId' })
  public role: Role;

  @OneToMany(() => History, (history) => history.organization)
  public histories: History[];

  @OneToMany(() => RequestJoin, (requestJoin) => requestJoin.user)
  public requestJoins: RequestJoin[];

  @OneToMany(() => OTP, (otp) => otp.user)
  public otp: OTP[];

  public getFullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }
}
