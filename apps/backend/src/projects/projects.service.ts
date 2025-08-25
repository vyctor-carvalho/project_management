import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findProjectTeams(projectId: string) {
    // Busca o projeto e carrega todos os membros e suas áreas
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: [
        'members', // Carrega a tabela de junção ProjectMember
        'members.member', // A partir da junção, carrega os dados do usuário
        'members.member.expertiseAreas', // Do usuário, carrega a outra junção
        'members.member.expertiseAreas.expertiseArea', // Finalmente, carrega o nome da área
      ],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${projectId}" not found`);
    }

    // Transforma os dados brutos em uma resposta formatada por equipe
    const teams = new Map<string, { area: string; members: any[] }>();

    for (const team_member of project.members) {
      if (team_member.member && team_member.member.expertiseAreas) {
        for (const userArea of team_member.member.expertiseAreas) {
          const areaName = userArea.expertiseArea.name;

          if (!teams.has(areaName)) {
            teams.set(areaName, {
              area: areaName,
              members: [],
            });
          }

          // Evita adicionar o mesmo membro duas vezes na mesma equipe
          const existingMembers = teams.get(areaName)?.members;
          if (!existingMembers?.some(m => m.userId === team_member.member.id)) {
            existingMembers?.push({
              userId: team_member.member.id,
              name: team_member.member.name,
              roleInProject: team_member.role, // Papel da pessoa no projeto
            });
          }
        }
      }
    }

    return {
      projectId: project.id,
      projectName: project.name,
      teams: Array.from(teams.values()),
    };
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
