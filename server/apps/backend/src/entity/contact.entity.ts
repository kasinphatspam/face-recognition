import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contact')
export class Contact {
    @PrimaryGeneratedColumn("increment")
    contactId: number

    @Column({
        nullable: false
    })
    organizationId: number

    @Column({
        nullable: false
    })
    firstname: string
    
    @Column({
        nullable: false
    })
    lastname: string

    @Column()
    organizationName: string

    @Column()
    titile: string

    @Column()
    officePhone: string

    @Column()
    mobile: string

    @Column()
    email: string

    @Column()
    alternateEmail: string

    @Column()
    dob: Date

    @Column()
    contactOwner: string

    @Column()
    createdTime: Date

    @Column()
    modifiedTime: Date

    @Column()
    lineId: string

    @Column()
    facebook: string

    @Column()
    linkedin: string

    @Column({
        nullable: true
    })
    encodedData: string
    
}