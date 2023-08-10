import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn("increment")
    userId: number

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
    personalId: string

    @Column({
        nullable: false
    })
    dob: Date
    
    @Column({
        name: "profileImage",
        nullable: true,
        default: ""
    })
    image: string

    @Column({
        nullable: true
    })
    organizationId: number

    @Column({
        nullable: true
    })
    departmentId: number
    
    @Column({
        nullable: true
    })
    roleId: number

    public getFullName(): string {
        return `${this.firstname} ${this.lastname}`
    }

}