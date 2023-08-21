import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('department')
export class Department {
  @PrimaryGeneratedColumn('increment')
  departmentId: number;

  @Column({
    nullable: false,
  })
  departmentName: string;
}
