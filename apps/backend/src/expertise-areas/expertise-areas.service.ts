import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpertiseAreaDto } from './dto/create-expertise-area.dto';
import { UpdateExpertiseAreaDto } from './dto/update-expertise-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpertiseArea } from './entities/expertise-area.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpertiseAreasService {

  constructor(
    @InjectRepository(ExpertiseArea) private readonly experienceAreaRepository: Repository<ExpertiseArea>
  ){}

  create(createExpertiseAreaDto: CreateExpertiseAreaDto) {
    const newExperieceArea = this.experienceAreaRepository.create(createExpertiseAreaDto)
    return this.experienceAreaRepository.save(newExperieceArea);
  }

  findAll() {
    return this.experienceAreaRepository.find();
  }

  findOne(id: string) {
    return this.experienceAreaRepository.findOneBy({ id });
  }

  async findMembersByArea(areaId: string) {
    // Busca a área e carrega suas relações aninhadas
    const areaWithMembers = await this.experienceAreaRepository.findOne({
      where: { id: areaId },
      relations: [
        'users', // Carrega os registros da tabela de junção 'UserExpertiseArea'
        'users.user', // A partir da junção, carrega os dados completos do usuário
      ],
    });

    if (!areaWithMembers) {
      throw new NotFoundException(`Expertise Area with ID "${areaId}" not found.`);
    }

    // Formata os dados para uma resposta de API limpa
    const members = areaWithMembers.users.map((userAssociation) => {
      // Garante que o usuário associado foi carregado
      if (!userAssociation.user) return null;

      return {
        userId: userAssociation.user.id,
        name: userAssociation.user.name,
        employmentType: userAssociation.user.employmentType,
      };
    }).filter(member => member !== null); // Remove qualquer resultado nulo

    return {
      areaId: areaWithMembers.id,
      areaName: areaWithMembers.name,
      members,
    };
  }

  async update(id: string, updateExpertiseAreaDto: UpdateExpertiseAreaDto) {
    await this.experienceAreaRepository.update(id, updateExpertiseAreaDto)
    return this.experienceAreaRepository.findOneBy({ id });
  }

  remove(id: string) {
    return this.experienceAreaRepository.delete(id);
  }
}
