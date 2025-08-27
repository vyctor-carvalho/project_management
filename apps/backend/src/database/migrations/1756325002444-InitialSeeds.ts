import { MigrationInterface, QueryRunner } from "typeorm";
import { Role } from "../../roles/entities/role.entity";
import { ExpertiseArea } from "../../expertise-areas/entities/expertise-area.entity";
import { User } from "../../users/entities/user.entity";
import { EmploymentType } from "../../users/enums/employment-type.enum";
import { AuthLogin } from "../../auth-login/entities/auth-login.entity";
import * as bcrypt from 'bcrypt';

export class InitialSeeds1756325002444 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // --- 1. Seed Roles ---
        const roleRepository = queryRunner.manager.getRepository(Role);
        await roleRepository.createQueryBuilder()
            .insert()
            .into(Role)
            .values([
                { name: 'Admin' },
                { name: 'Manager' },
                { name: 'Collaborator' },
            ])
            .orIgnore() 
            .execute();
        console.log('✅ Roles seeded');

        const expertiseAreaRepository = queryRunner.manager.getRepository(ExpertiseArea);
        await expertiseAreaRepository.createQueryBuilder()
            .insert()
            .into(ExpertiseArea)
            .values([
                { name: 'Backend' },
                { name: 'Frontend' },
                { name: 'Design' },
                { name: 'Infraestrutura' },
                { name: 'Gestão' },
            ])
            .orIgnore() 
            .execute();
        console.log('✅ Expertise Areas seeded');

        const userRepository = queryRunner.manager.getRepository(User);
        const adminRole = await roleRepository.findOneBy({ name: 'Admin' });

        if (adminRole) {
            const adminEmail = 'admin@example.com';
            const adminExists = await userRepository.findOne({
                where: { authLogin: { email: adminEmail } },
            });

            if (!adminExists) {
                const password = 'supersecretpassword';
                const hashedPassword = await bcrypt.hash(password, 10);
                
                const authLogin = new AuthLogin();
                authLogin.email = adminEmail;
                authLogin.password = hashedPassword;

                const newUser = userRepository.create({
                    name: 'Administrador do Sistema',
                    BrithDate: new Date('1990-01-01'), 
                    employmentType: EmploymentType.CLT,
                    userRole: adminRole,
                    authLogin: authLogin,
                });

                await userRepository.save(newUser);
                console.log(`✅ Created Admin User with email: ${adminEmail}`);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "users" WHERE "authLoginEmail" = 'admin@example.com'`);
        await queryRunner.query(`DELETE FROM "roles" WHERE "name" IN ('Admin', 'Manager', 'Collaborator')`);
        await queryRunner.query(`DELETE FROM "expertise_areas" WHERE "name" IN ('Backend', 'Frontend', 'Design', 'Infraestrutura', 'Gestão')`);
        console.log('Initial data reverted');
    }
}