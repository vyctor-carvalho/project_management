import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "roles" })
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    name: string;
}
