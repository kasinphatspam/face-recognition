import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn("increment")
    id: string

    @Column({
        nullable: false
    })
    email: string

    @Column({
        nullable: false
    })
    password: string

    @Column({ 
        name: "fname",
        nullable: false 
    })
    firstName: string

    @Column({ 
        name: "lname",
        nullable: false 
    })
    lastName: string

    @Column({
        nullable: false
    })
    gender: string

    @Column({
        nullable: false
    })
    dob: Date
    
    @Column({
        name: "profile_image",
        nullable: true,
        default: ""
    })
    image: string

    @Column({
        nullable: true
    })
    organization_id: number

    @Column({
        nullable: true
    })
    department_id: number
    
    @Column({
        nullable: true
    })
    role_id: number

}