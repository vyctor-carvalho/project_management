import { Module } from '@nestjs/common';
import { ExpertiseAreasService } from './expertise-areas.service';
import { ExpertiseAreasController } from './expertise-areas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpertiseArea } from './entities/expertise-area.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpertiseArea])
  ],
  controllers: [ExpertiseAreasController],
  providers: [ExpertiseAreasService],
})
export class ExpertiseAreasModule {}
