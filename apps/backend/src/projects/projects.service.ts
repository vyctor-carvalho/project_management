import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { error } from 'console';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    // Checando se a data já passou
    if (createProjectDto.deadline.getTime() < new Date().getTime()) return  null;

    this.projectRepository.create(createProjectDto);

    return this.projectRepository.save(createProjectDto);
  }

  findAll() {
    return this.projectRepository.find();
  }

  findOne(id: string) {
    return this.projectRepository.findOneBy({id});
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    // Verificando se o projeto existe para alterar a data de update
    const project = await this.projectRepository.findOneBy({id})
    if (!project) return null;

    // Caso o projeto já exista no banco eu altero a data de update
    project.updated_at = new Date();
    
    await this.projectRepository.update(id, updateProjectDto);
    return this.projectRepository.findOneBy({id});
  }

  remove(id: string) {
    return this.projectRepository.delete(id);
  }
}
