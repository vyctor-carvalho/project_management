import { Module } from '@nestjs/common';
import { AuthLoginService } from './auth-login.service';
import { AuthLoginController } from './auth-login.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

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
  ],
  exports: [AuthLoginService], 
})
export class AuthLoginModule {}