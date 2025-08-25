import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserExpertiseAreaDto } from './dto/create-user_expertise_area.dto';
import { UpdateUserExpertiseAreaDto } from './dto/update-user_expertise_area.dto';
import { ExpertiseAreasService } from 'src/expertise-areas/expertise-areas.service';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserExpertiseArea } from './entities/user_expertise_area.entity';

@Injectable()
export class UserExpertiseAreasService {
  constructor(
    @InjectRepository(UserExpertiseArea)
    private userExpertiseAreaRepository: Repository<UserExpertiseArea>,
    private usersService: UsersService,
    private expertiseAreasService: ExpertiseAreasService
  ) {}

  async create(createUserExpertiseAreaDto: CreateUserExpertiseAreaDto) {
    // Busca as entidades User e ExpertiseArea pelos IDs passados
    const user = await this.usersService.findOne(createUserExpertiseAreaDto.userId);
    const expertiseArea = await this.expertiseAreasService.findOne(createUserExpertiseAreaDto.expertiseAreaId);

    if (!user || !expertiseArea) {
      throw new NotFoundException('User or expertise area not found.');
    }

    // Cria e salva a nova associação entre o usuário e a área.
    const userExpertiseArea = this.userExpertiseAreaRepository.create({
      user,
      expertiseArea,
    });
    
    return this.userExpertiseAreaRepository.save(userExpertiseArea);
  }

  findAll() {
    return this.userExpertiseAreaRepository.find({
      relations: {
        user: true,
        expertiseArea: true,
      }
    });
  }

  findOne(id: string) {
    return this.userExpertiseAreaRepository.findOne({
      where: { id },
      relations: {
        user: true,
        expertiseArea: true,
      }
    });
  }

  async update(id: string, updateUserExpertiseAreaDto: UpdateUserExpertiseAreaDto) {
    // Verifica se o registro existente existe.
    const existingUserExpertiseArea = await this.findOne(id);

    if (!existingUserExpertiseArea) {
      throw new NotFoundException('User expertise area not found.');
    }

    // Busca as novas entidades que serão associadas.
    const user = await this.usersService.findOne(updateUserExpertiseAreaDto.userId);
    const expertiseArea = await this.expertiseAreasService.findOne(updateUserExpertiseAreaDto.expertiseAreaId);

    if (!user || !expertiseArea) {
      throw new NotFoundException('User or expertise area not found.');
    }

    // Atualiza o registro existente com os novos relacionamentos.
    await this.userExpertiseAreaRepository.update(id, {
      user,
      expertiseArea,
    });

    return this.findOne(id);
  }

  remove(id: string) {
    return this.userExpertiseAreaRepository.delete(id);
  }
}
