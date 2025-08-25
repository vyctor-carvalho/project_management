import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectMemberDto } from './dto/create-project_member.dto';
import { UpdateProjectMemberDto } from './dto/update-project_member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectMember } from './entities/project_member.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/projects.service';
import { UsersService } from 'src/users/users.service';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';

@Injectable()
export class ProjectMembersService {
  constructor(
    @InjectRepository(ProjectMember)
    private readonly projectMemberRepository: Repository<ProjectMember>,
    private readonly prijectService: ProjectsService,
    private readonly userService: UsersService,
  ) {}

  async create(createProjectMemberDto: CreateProjectMemberDto) {
    const project = await this.prijectService.findOne(createProjectMemberDto.projectId);
    const member = await this.userService.findOne(createProjectMemberDto.memberId);

    if (!project || !member) {
      throw new NotFoundException('Project or member not found');
    }

    const newProjectMember = this.projectMemberRepository.create({
      role: createProjectMemberDto.role,
      project,
      member: member,
    });

    return await this.projectMemberRepository.save(newProjectMember);
  }

  findAll() {
    return this.projectMemberRepository.find({
      relations: {
        project: true,
        member: true,
      }
    });
  }

  findOne(id: string) {
    return this.projectMemberRepository.findOne({
      where: { id },
      relations: {
        project: true,
        member: true,
      }
    });
  }

async update(id: string, updateProjectMemberDto: UpdateProjectMemberDto) {
  // Garante que a associação que queremos editar existe
  const projectMember = await this.findOne(id);
  if (!projectMember) {
    throw new NotFoundException(`Project member with ID "${id}" not found`);
  }

  // Prepara o objeto de atualização apenas com os dados que foram enviados
  const { projectId, memberId, role } = updateProjectMemberDto;
  const partialEntity: QueryDeepPartialEntity<ProjectMember> = {};

  if (role) {
    partialEntity.role = role;
  }

  console.log(projectId, memberId)

  // Se um novo ID de projeto foi enviado, busca e anexa a entidade
  if (projectId) {
    const project = await this.prijectService.findOne(projectId);
    if (!project) throw new NotFoundException(`Project with ID "${projectId}" not found`);
    partialEntity.project = project;
  }

  // Se um novo ID de membro foi enviado, busca e anexa a entidade user
  if (memberId) {
    const user = await this.userService.findOne(memberId);
    if (!user) throw new NotFoundException(`Member (user) with ID "${memberId}" not found`);
    partialEntity.member = user; // A propriedade correta na entidade é 'user'
  }

  // Aplica as mudanças no banco e retorna o registro completo
  await this.projectMemberRepository.update(id, partialEntity);
  
  return this.findOne(id);
}

  remove(id: string) {
    return `This action removes a #${id} projectMember`;
  }
}
