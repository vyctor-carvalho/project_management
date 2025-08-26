import { forwardRef, Module } from '@nestjs/common';
import { ProjectMembersService } from './project_members.service';
import { ProjectMembersController } from './project_members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectMember } from './entities/project_member.entity';
import { UsersModule } from 'src/users/users.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { AuthLoginModule } from 'src/auth-login/auth-login.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectMember]),
    UsersModule,
    ProjectsModule,
  ],
  controllers: [ProjectMembersController],
  providers: [ProjectMembersService],
  exports: [ProjectMembersService]
})
export class ProjectMembersModule {}
