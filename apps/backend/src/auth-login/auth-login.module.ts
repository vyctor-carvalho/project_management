import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthLoginService } from './auth-login.service';
import { AuthLoginController } from './auth-login.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { ProjectsModule } from 'src/projects/projects.module';
import { RolesModule } from 'src/roles/roles.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { ProjectMembersModule } from 'src/project_members/project_members.module';
import { ExpertiseAreasModule } from 'src/expertise-areas/expertise-areas.module';
import { UserExpertiseAreasModule } from 'src/user_expertise_areas/user_expertise_areas.module';

@Global()
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({}),
  ], 
  controllers: [AuthLoginController],
  providers: [
    AuthLoginService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    RolesGuard
  ],
  exports: [AuthLoginService], 
})
export class AuthLoginModule {}