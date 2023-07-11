import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contact')
export class Contact {
    @PrimaryGeneratedColumn("increment",
    {
        name: "contact_id"
    })
    id: number

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

    @Column()
    organization_name: string

    @Column()
    titile: string

    @Column()
    office_phone: string

    @Column()
    mobile: string

    @Column()
    email: string

    @Column()
    alternate_email: string

    @Column()
    dob: Date

    @Column()
    contact_owner: string

    @Column()
    created_time: Date

    @Column()
    modified_time: Date

    @Column()
    line_id: string

    @Column()
    facebook: string

    @Column()
    linkedin: string

    @Column()
    encoded_data: string
    
}