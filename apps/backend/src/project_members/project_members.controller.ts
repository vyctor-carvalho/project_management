import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectMembersService } from './project_members.service';
import { CreateProjectMemberDto } from './dto/create-project_member.dto';
import { UpdateProjectMemberDto } from './dto/update-project_member.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth-login/guards/roles.guard';
import { Roles } from 'src/auth-login/decorators/roles.decorator';

@Controller('project-members')
@Roles('Admin', 'Manager')
@UseGuards(AuthGuard('jwt'), RolesGuard) 
export class ProjectMembersController {
  constructor(private readonly projectMembersService: ProjectMembersService) {}

  @Post()
  create(@Body() createProjectMemberDto: CreateProjectMemberDto) {
    return this.projectMembersService.create(createProjectMemberDto);
  }

  @Get()
  findAll() {
    return this.projectMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectMembersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectMemberDto: UpdateProjectMemberDto) {
    return this.projectMembersService.update(id, updateProjectMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectMembersService.remove(id);
  }
}
