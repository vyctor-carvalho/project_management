import { Injectable } from '@nestjs/common';
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

  async update(id: string, updateExpertiseAreaDto: UpdateExpertiseAreaDto) {
    await this.experienceAreaRepository.update(id, updateExpertiseAreaDto)
    return this.experienceAreaRepository.findOneBy({ id });
  }

  remove(id: string) {
    return this.experienceAreaRepository.delete(id);
  }
}
