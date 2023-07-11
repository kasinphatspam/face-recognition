import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('department')
export class Department {
    
    @PrimaryGeneratedColumn("increment")
    id: number
    
    @Column({
        name: "department_name",
        nullable: false
    })
    name: string

}