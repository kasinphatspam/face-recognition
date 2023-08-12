import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('role')
class Role {
    @PrimaryGeneratedColumn('increment')
    public roleId: number
    @Column()
    public roleName: string
    @Column()
    public organizationId: number
}

export { Role }