import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from './organization.entity';

@Entity('plan')
export class Plan {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false, length: 20 })
  public title: string;

  @Column({ nullable: false })
  public cost: number;

  @Column({ nullable: false })
  public limitEmployee: number;

  @Column({ nullable: false })
  public limitContact: number;

  @Column({ nullable: false, default: '' })
  public feature: string;

  @OneToMany(() => Organization, (org) => org.plan)
  public organizations: Organization[];
}
