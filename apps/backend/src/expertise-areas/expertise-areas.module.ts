import { forwardRef, Module } from '@nestjs/common';
import { ExpertiseAreasService } from './expertise-areas.service';
import { ExpertiseAreasController } from './expertise-areas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpertiseArea } from './entities/expertise-area.entity';
import { AuthLoginModule } from 'src/auth-login/auth-login.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpertiseArea]),
  ],
  controllers: [ExpertiseAreasController],
  providers: [ExpertiseAreasService],
  exports: [ExpertiseAreasService],
})
export class ExpertiseAreasModule {}
