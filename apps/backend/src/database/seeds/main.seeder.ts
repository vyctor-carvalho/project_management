import { Seeder, SeederFactoryManager, runSeeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { RoleSeeder } from './role.seeder';
import { ExpertiseAreaSeeder } from './expertise-area.seeder';
import { UserSeeder } from './user.seeder';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // Executa os seeders na ordem de dependência
    await runSeeder(dataSource, RoleSeeder);
    await runSeeder(dataSource, ExpertiseAreaSeeder);
    await runSeeder(dataSource, UserSeeder);
  }
}