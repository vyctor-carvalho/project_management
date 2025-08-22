import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config"; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { ExpertiseAreasModule } from './expertise-areas/expertise-areas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],  
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      })
    }),
    RolesModule,
    ExpertiseAreasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
