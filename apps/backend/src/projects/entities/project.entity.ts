import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "projects" })
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "name", type: "varchar", length: 50 })
    name: string;

    @Column({ name: "description", type: "varchar", length: 255 })
    description: string;

    @Column({ name: "technologies", type: "varchar", length: 150 })
    technologies: string;

    @Column({ type: 'timestamp' })
    deadline: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
