import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import * as dotenv from 'dotenv';
import { Organization } from './organization.entity';

dotenv.config();
@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ManyToOne(() => Organization, (organization) => organization.contacts)
  @JoinColumn({ name: "organizationId" })
  public organization: Organization;

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
    nullable: true,
    length: 60,
  })
  public contactCompany: string;

  @Column({
    nullable: true,
    length: 30,
  })
  public title: string;

  @Column({
    nullable: true,
    length: 12,
  })
  public officePhone: string;

  @Column({
    nullable: true,
    length: 12,
  })
  public mobile: string;

  @Column({
    nullable: true,
    length: 50,
  })
  public email1: string;

  @Column({
    nullable: true,
    length: 50,
  })
  public email2: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  public dob: Date;

  @Column({
    nullable: true,
    length: 60,
  })
  public contactOwner: string;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdTime: Date;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public modifiedTime: Date;

  @Column({
    nullable: true,
    length: 30,
  })
  public lineId: string;

  @Column({
    nullable: true,
    length: 100,
  })
  public facebook: string;

  @Column({
    nullable: true,
    length: 100,
  })
  public linkedin: string;

  @Column({
    nullable: true,
    length: 100,
  })
  public encodedId: string;

  @Column({
    nullable: false,
    length: 255,
    default: `${process.env.BACKEND_URL}/images/contact/default.png`,
  })
  public image: string;
}
