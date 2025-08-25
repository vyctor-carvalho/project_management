import { Task } from "src/tasks/entities/task.entity";
import { UserExpertiseArea } from "src/user_expertise_areas/entities/user_expertise_area.entity";
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

    @OneToMany(() => UserExpertiseArea, (userExpertiseArea) => userExpertiseArea.expertiseArea)
    users: UserExpertiseArea[];
}
