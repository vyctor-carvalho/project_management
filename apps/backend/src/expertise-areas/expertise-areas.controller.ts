import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExpertiseAreasService } from './expertise-areas.service';
import { CreateExpertiseAreaDto } from './dto/create-expertise-area.dto';
import { UpdateExpertiseAreaDto } from './dto/update-expertise-area.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth-login/guards/roles.guard';
import { Roles } from 'src/auth-login/decorators/roles.decorator';

@Controller('expertise-areas')
@UseGuards(AuthGuard('jwt'), RolesGuard) 
export class ExpertiseAreasController {
  constructor(private readonly expertiseAreasService: ExpertiseAreasService) {}

  @Post()
  @Roles('Admin', 'Manager')
  create(@Body() createExpertiseAreaDto: CreateExpertiseAreaDto) {
    return this.expertiseAreasService.create(createExpertiseAreaDto);
  }

  @Get()
  @Roles('Admin', 'Manager')
  findAll() {
    return this.expertiseAreasService.findAll();
  }

  @Get(':id')
  @Roles('Admin', 'Manager', 'Collaborator')
  findOne(@Param('id') id: string) {
    return this.expertiseAreasService.findOne(id);
  }

  @Get(':id/members')
  @Roles('Admin', 'Manager', 'Collaborator')
  findMembersByArea(@Param('id') id: string) {
    return this.expertiseAreasService.findMembersByArea(id);
  }

  @Patch(':id')
  @Roles('Admin', 'Manager')
  update(@Param('id') id: string, @Body() updateExpertiseAreaDto: UpdateExpertiseAreaDto) {
    return this.expertiseAreasService.update(id, updateExpertiseAreaDto);
  }

  @Delete(':id')
  @Roles('Admin', 'Manager')
  remove(@Param('id') id: string) {
    return this.expertiseAreasService.remove(id);
  }
}
