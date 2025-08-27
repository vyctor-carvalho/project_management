import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { EmploymentType } from '../../users/enums/employment-type.enum';
import { AuthLogin } from '../../auth-login/entities/auth-login.entity';

export class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    // Encontra o papel 'Admin' que foi criado pelo seeder anterior
    const adminRole = await roleRepository.findOneBy({ name: 'Admin' });
    if (!adminRole) {
      console.error("Admin role not found. Please run RoleSeeder first.");
      return;
    }

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
        name: 'Adminstrador do Sistema',
        employmentType: EmploymentType.CLT,
        userRole: adminRole,
        authLogin: authLogin,
      });

      await userRepository.save(newUser);
      console.log(`Created Admin User with email: ${adminEmail} and password: ${password}`);
    }
  }
}