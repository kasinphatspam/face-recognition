import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import * as dotenv from 'dotenv';
import { Organization } from './organization.entity';
import { ApiProperty } from '@nestjs/swagger';

dotenv.config();
@Entity('contact')
export class Contact {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ManyToOne(() => Organization, (organization) => organization.contacts)
  @JoinColumn({ name: 'organizationId' })
  public organization: Organization;

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
    nullable: true,
    length: 60,
  })
  public company: string;

  @ApiProperty()
  @Column({
    nullable: true,
    length: 30,
  })
  public title: string;

  @ApiProperty()
  @Column({
    nullable: true,
    length: 12,
  })
  public officePhone: string;

  @ApiProperty()
  @Column({
    nullable: true,
    length: 12,
  })
  public mobile: string;

  @ApiProperty()
  @Column({
    nullable: true,
    length: 50,
  })
  public email1: string;

  @ApiProperty()
  @Column({
    nullable: true,
    length: 50,
  })
  public email2: string;

  @ApiProperty()
  @Column({
    type: 'date',
    nullable: true,
  })
  public dob: Date;

  @ApiProperty()
  @Column({
    nullable: true,
    length: 60,
  })
  public owner: string;

  @ApiProperty()
  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdTime: Date;

  @ApiProperty()
  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public modifiedTime: Date;

  @ApiProperty()
  @Column({
    nullable: true,
    length: 30,
  })
  public lineId: string;

  @ApiProperty()
  @Column({
    nullable: true,
    length: 100,
  })
  public facebook: string;

  @ApiProperty()
  @Column({
    nullable: true,
    length: 100,
  })
  public linkedin: string;

  @ApiProperty()
  @Column({
    nullable: true,
    length: 100,
  })
  public encodedId: string;

  @ApiProperty()
  @Column({
    nullable: false,
    length: 255,
    default: `${process.env.AWS_SPACE_URL}/images/contacts/default.png`,
  })
  public image: string;
}
