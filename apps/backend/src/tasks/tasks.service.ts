import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { ProjectsService } from 'src/projects/projects.service';
import { UsersService } from 'src/users/users.service';
import { ExpertiseAreasService } from 'src/expertise-areas/expertise-areas.service';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
    private readonly expertiseAreasService: ExpertiseAreasService
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const { projectId, assigneeId, areaId, ...taskData } = createTaskDto;

    // Valida se as entidades relacionadas existem
    const [project, user, expertiseArea] = await Promise.all([
      this.projectsService.findOne(projectId),
      assigneeId ? this.usersService.findOne(assigneeId) : Promise.resolve(null),
      this.expertiseAreasService.findOne(areaId),
    ]);

    if (!project || !expertiseArea) {
      throw new NotFoundException('Project or Area of ​​Activity not found.');
    }
    // Lança erro se um assigneeId foi fornecido mas o usuário não foi encontrado
    if (assigneeId && !user) {
        throw new NotFoundException(`User with ID "${assigneeId}" not found.`);
    }

    // Cria a nova tarefa com os dados e as entidades encontradas
    const task = this.taskRepository.create({
      ...taskData, // title, description, status, priority e dueDate
      project: project,
      user: user || undefined, // O user é upcional na hora de criar uma task
      expertiseArea: expertiseArea,
    });

    // Salva a nova tarefa no banco
    return this.taskRepository.save(task);
  }

  findAll() {
    return this.taskRepository.find({
      relations: {
        project: true,
        user: true,
        expertiseArea: true,
      },
    });
  }

  findOne(id: string) {
    return this.taskRepository.findOne({
      where: { id },
      relations: {
        project: true,
        user: true,
        expertiseArea: true,
      },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    // Garante que a tarefa que queremos editar realmente existe
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }

    // Prepara um objeto apenas com os dados que serão atualizados
    const { projectId, assigneeId, areaId, ...taskData } = updateTaskDto;
    const partialEntity: QueryDeepPartialEntity<Task> = { ...taskData };

    // Se um novo ID de projeto foi enviado, valida e anexa a entidade
    if (projectId) {
      const project = await this.projectsService.findOne(projectId);
      if (!project) {
        throw new NotFoundException(`Project with ID "${projectId}" not found.`);
      }
      partialEntity.project = project;
    }

    // Permite alterar ou remover o responsável pela tarefa
    if (assigneeId !== undefined) {
      if (assigneeId === null) {
        partialEntity.user = undefined; // Remove o responsável
      } else {
        const user = await this.usersService.findOne(assigneeId);
        if (!user) {
          throw new NotFoundException(`User (assignee) with ID "${assigneeId}" not found.`);
        }
        partialEntity.user = user; // Atribui um novo responsável
      }
    }

    // Se uma nova área foi enviada, valida e anexa a entidade
    if (areaId) {
      const area = await this.expertiseAreasService.findOne(areaId);
      if (!area) {
        throw new NotFoundException(`Expertise Area with ID "${areaId}" not found.`);
      }
      partialEntity.expertiseArea = area;
    }

    // Aplica as mudanças no banco 
    await this.taskRepository.update(id, partialEntity);

    // Reutiliza o método findOne para garantir que a resposta inclua todas as relações
    return this.findOne(id);
  }

  remove(id: string) {
    return this.taskRepository.delete(id);
  }
}
