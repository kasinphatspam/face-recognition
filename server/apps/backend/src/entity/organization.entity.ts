import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('organization')
class Organization {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        name: "organization_name",
        nullable: false
    })
    name: string

    @Column({
        name: "organization_code",
        nullable: false
    })
    code: string

    @Column({
        name: "code_expired_time",
        nullable: false
    })
    expired_time: Date

    @Column({
        name: "code_created_time",
        nullable: false
    })
    created_time: Date


    @Column({
        nullable: true,
        default: ""
    })
    vtiger_token: string

    @Column({
        nullable: true,
        default: ""
    })
    vtiger_access_key: string

    @Column({
        nullable: true,
        default: ""
    })
    vtiger_link: string
}

@Entity('organization_department')
class OrganizationDepartment {

    @PrimaryColumn()
    organization_id: number
    @PrimaryColumn()
    department_id: number
}

@Entity('organization_contact')
class OrganizationContact {
    @PrimaryColumn()
    organization_id: number
    @PrimaryColumn()
    contact_id: number
}

@Entity('organization_role')
class OrganizationRole {
    @PrimaryColumn()
    organization_id: number
    @PrimaryColumn()
    role_id: number
}

export { Organization, OrganizationDepartment}