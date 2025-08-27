import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ExpertiseArea } from '../../expertise-areas/entities/expertise-area.entity';

export class ExpertiseAreaSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const ExpertiseAreaRepository = dataSource.getRepository(ExpertiseArea);

    const areasData = [
      { name: 'Backend' },
      { name: 'Frontend' },
      { name: 'Design' },
      { name: 'Infraestrutura' },
      { name: 'Gestão' },
    ];

    for (const data of areasData) {
      const areaExists = await ExpertiseAreaRepository.findOneBy({ name: data.name });
      if (!areaExists) {
        const newArea = ExpertiseAreaRepository.create(data);
        await ExpertiseAreaRepository.save(newArea);
        console.log(`Created Expertise Area: ${data.name}`);
      }
    }
  }
}