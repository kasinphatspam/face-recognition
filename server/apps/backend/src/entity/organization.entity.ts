import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

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

@Entity('organization_department')
class OrganizationDepartment {

    @PrimaryColumn()
    organizationId: number
    @PrimaryColumn()
    departmentId: number
}

@Entity('organization_contact')
class OrganizationContact {
    @PrimaryColumn()
    organizationId: number
    @PrimaryColumn()
    contactId: number
}

@Entity('organization_role')
class OrganizationRole {
    @PrimaryColumn()
    organizationId: number
    @PrimaryColumn()
    roleId: number
}

export { Organization, OrganizationDepartment, OrganizationContact, OrganizationRole}