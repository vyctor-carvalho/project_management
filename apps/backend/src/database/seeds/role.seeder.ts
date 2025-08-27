import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

export class RoleSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository = dataSource.getRepository(Role);

        const roles = [
            { name: 'Admin' },
            { name: 'Manager' },
            { name: 'Collaborator' },
        ];

        // Usamos o queryBuilder para inserir e ignorar conflitos caso o 'name' já exista.
        await repository.createQueryBuilder()
            .insert()
            .into(Role)
            .values(roles)
            .orIgnore() // ou .onConflict(`("name") DO NOTHING`) para ser explícito com PostgreSQL
            .execute();
    }
}