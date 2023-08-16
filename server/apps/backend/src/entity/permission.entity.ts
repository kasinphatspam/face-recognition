import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('permission')
class Permission {

    @PrimaryGeneratedColumn('increment')
    permissionId: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    createdTime: Date

}

export { Permission }