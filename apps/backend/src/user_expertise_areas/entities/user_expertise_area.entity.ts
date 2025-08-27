import { ExpertiseArea } from "../../expertise-areas/entities/expertise-area.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user_expertise_areas" })
export class UserExpertiseArea {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.expertiseAreas)
    @JoinColumn({ name: 'user_id' }) 
    user: User;

    @ManyToOne(() => ExpertiseArea, (expertiseArea) => expertiseArea.users)
    @JoinColumn({ name: 'expertise_area_id' })
    expertiseArea: ExpertiseArea;
}
