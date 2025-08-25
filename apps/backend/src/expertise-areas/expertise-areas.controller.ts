import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpertiseAreasService } from './expertise-areas.service';
import { CreateExpertiseAreaDto } from './dto/create-expertise-area.dto';
import { UpdateExpertiseAreaDto } from './dto/update-expertise-area.dto';

@Controller('expertise-areas')
export class ExpertiseAreasController {
  constructor(private readonly expertiseAreasService: ExpertiseAreasService) {}

  @Post()
  create(@Body() createExpertiseAreaDto: CreateExpertiseAreaDto) {
    return this.expertiseAreasService.create(createExpertiseAreaDto);
  }

  @Get()
  findAll() {
    return this.expertiseAreasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expertiseAreasService.findOne(id);
  }

  @Get(':id/members')
  findMembersByArea(@Param('id') id: string) {
    return this.expertiseAreasService.findMembersByArea(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpertiseAreaDto: UpdateExpertiseAreaDto) {
    return this.expertiseAreasService.update(id, updateExpertiseAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expertiseAreasService.remove(id);
  }
}
