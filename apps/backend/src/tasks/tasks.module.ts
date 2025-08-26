import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ExpertiseAreasModule } from 'src/expertise-areas/expertise-areas.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { UsersModule } from 'src/users/users.module';
import { AuthLoginModule } from 'src/auth-login/auth-login.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Task]),
      ProjectsModule,
      UsersModule,
      ExpertiseAreasModule
    ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
