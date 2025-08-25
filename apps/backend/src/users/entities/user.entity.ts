import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuthLogin } from "../../auth-login/entities/auth-login.entity";
import { EmploymentType } from "../enums/employment-type.enum";
import { Role } from "src/roles/entities/role.entity";
import { Task } from "src/tasks/entities/task.entity";
import { UserExpertiseArea } from "src/user_expertise_areas/entities/user_expertise_area.entity";
import { ProjectMember } from "src/project_members/entities/project_member.entity";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 100, type: "varchar" })
    name: string;

    @Column(() => AuthLogin, { prefix: false })
    authLogin: AuthLogin;

    @Column({ name: "birth_date", type: "timestamp" })
    BrithDate: Date;

    @Column({ name: "employment_type", type: "enum", enum: EmploymentType })
    employmentType: EmploymentType;

    @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })  
    updatedAt: Date;

    @ManyToOne(() => Role, (Role) => Role.users)
    @JoinColumn({ name: 'role_id' })
    userRole: Role

    @Column({ name: 'current_hashed_refresh_token', type: 'varchar', nullable: true })
    currentHashedRefreshToken?: string;

    @OneToMany(() => Task, (task) => task.user)
    @JoinColumn({ name: 'task_id' })
    tasks: Task[];

    @OneToMany(() => UserExpertiseArea, (userExpertiseArea) => userExpertiseArea.user)
    expertiseAreas: UserExpertiseArea[];

    @OneToMany(() => ProjectMember, (projectMember) => projectMember.member)
    projects: ProjectMember[];

}
