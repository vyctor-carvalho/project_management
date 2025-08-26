import { forwardRef, Module } from '@nestjs/common';
import { UserExpertiseAreasService } from './user_expertise_areas.service';
import { UserExpertiseAreasController } from './user_expertise_areas.controller';
import { UserExpertiseArea } from './entities/user_expertise_area.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ExpertiseAreasModule } from 'src/expertise-areas/expertise-areas.module';
import { AuthLoginModule } from 'src/auth-login/auth-login.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserExpertiseArea]),
    UsersModule,
    ExpertiseAreasModule
  ],
  controllers: [UserExpertiseAreasController],
  providers: [UserExpertiseAreasService],
})
export class UserExpertiseAreasModule {}
