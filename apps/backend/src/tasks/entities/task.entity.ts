import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../enums/tasks-status.enum";
import { TaskPriority } from "../enums/task-priority.enum";
import { Type } from "class-transformer";
import { Project } from "../../projects/entities/project.entity";
import { User } from "../../users/entities/user.entity";
import { ExpertiseArea } from "../../expertise-areas/entities/expertise-area.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    title: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    description: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.TO_DO
    })
    status: TaskStatus;

    @Column({
        type: 'enum',
        enum: TaskPriority,
        default: TaskPriority.MEDIUM
    })
    priority: TaskPriority;

    @Type(() => Date)
    @Column({ 
        name: 'due_date', 
        type: 'timestamp', 
        nullable: true 
    })
    dueDate: Date;

    @ManyToOne(() => Project, (project) => project.tasks)
    @JoinColumn({ name: 'project_id' })
    project: Project

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => ExpertiseArea, (expertiseArea) => expertiseArea.tasks)
    @JoinColumn({ name: 'expertise_area_id' })
    expertiseArea: ExpertiseArea
}
