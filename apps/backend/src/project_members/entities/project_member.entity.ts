import { Project } from "../../projects/entities/project.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'project_members'})
export class ProjectMember {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 25 })
    role: string;

    @ManyToOne(() => Project, (project) => project.members)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @ManyToOne(() => User, (user) => user.projects)
    @JoinColumn({ name: 'member_id' })
    member: User;
}
