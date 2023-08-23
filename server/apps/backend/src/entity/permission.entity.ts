import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permission')
class Permission {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: false,
    length: 40,
  })
  title: string;

  @Column({
    nullable: false,
    length: 255,
  })
  description: string;

  @Column({
    nullable: false,
    type: 'datetime',
  })
  createdTime: Date;
}

export { Permission };
