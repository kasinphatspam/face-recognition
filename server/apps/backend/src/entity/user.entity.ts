import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import * as dotenv from 'dotenv';
import { Organization } from './organization.entity';

dotenv.config()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  userId: number;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
  })
  firstname: string;

  @Column({
    nullable: false,
  })
  lastname: string;

  @Column({
    nullable: true,
  })
  gender: string;

  @Column({
    nullable: false,
  })
  personalId: string;

  @Column({
    nullable: true,
  })
  dob: Date;

  @Column({
    name: 'profileImage',
    nullable: true,
    default: `${process.env.BACKEND_URL}/images/users/default.jpeg`,
  })
  image: string;

  @Column({
    nullable: true,
  })
  organizationId: number;

  @Column({
    nullable: true,
  })
  departmentId: number;

  @Column({
    nullable: true,
  })
  roleId: number;

  public getFullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }
}
