import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth-login/guards/roles.guard';
import { Roles } from 'src/auth-login/decorators/roles.decorator';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'), RolesGuard) 
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles('Admin', 'Manager')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @Roles('Admin', 'Manager', 'Collaborator')
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @Roles('Admin', 'Manager', 'Collaborator')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @Roles('Admin', 'Manager')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @Roles('Admin', 'Manager')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
