import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "expertise_areas" })
export class ExpertiseArea {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    name: string;

    @OneToMany(() => Task, (task) => task.expertiseArea)
    @JoinColumn({ name: 'task_id' })
    tasks: Task[];
}
