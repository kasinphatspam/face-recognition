import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({
        unique: true,
        nullable: false
    })
    email: string

    @Column({
        nullable: false
    })
    password: string

    @Column({ 
        nullable: false 
    })
    firstname: string

    @Column({ 
        name: "lname",
        nullable: false 
    })
    lastname: string

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