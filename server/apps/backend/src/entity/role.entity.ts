import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('role')
class Role {
    @PrimaryGeneratedColumn('increment')
    public roleId: number
    public roleName: string
}

export { Role }