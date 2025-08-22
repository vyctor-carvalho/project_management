import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "expertise_areas" })
export class ExpertiseArea {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    name: string;
}
