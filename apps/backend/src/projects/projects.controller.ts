import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth-login/guards/roles.guard';
import { Roles } from 'src/auth-login/decorators/roles.decorator';

@Controller('projects')
@UseGuards(AuthGuard('jwt'), RolesGuard) 
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles('Admin', 'Manager')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @Roles('Admin')
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @Roles('Admin', 'Manager', 'Collaborator')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Get(':id/teams')
  @Roles('Admin', 'Manager')
  findProjectTeams(@Param('id') id: string) {
    return this.projectsService.findProjectTeams(id);
  }

  @Patch(':id')
  @Roles('Admin', 'Manager')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @Roles('Admin', 'Manager')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
