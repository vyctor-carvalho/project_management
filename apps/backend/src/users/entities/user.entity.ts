import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuthLogin } from "../../auth-login/entities/auth-login.entity";
import { EmploymentType } from "../enums/employment-type.enum";
import { Role } from "src/roles/entities/role.entity";

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

}
