import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('organization')
class Organization {

    @PrimaryGeneratedColumn('increment')
    organizationId: number

    @Column({
        nullable: false
    })
    organizationName: string

    @Column({
        name: "organizationCode",
        unique: true,
        nullable: false
    })
    code: string

    @Column({
        nullable: false
    })
    codeExpiredTime: Date

    @Column({
        nullable: false
    })
    codeCreatedTime: Date


    @Column({
        nullable: true,
        default: ""
    })
    vtigerToken: string

    @Column({
        nullable: true,
        default: ""
    })
    vtigerAccessKey: string

    @Column({
        nullable: true,
        default: ""
    })
    vtigerLink: string
}

export { Organization }