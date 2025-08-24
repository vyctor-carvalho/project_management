import { Module } from '@nestjs/common';
import { AuthLoginService } from './auth-login.service';
import { AuthLoginController } from './auth-login.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule], 
  controllers: [AuthLoginController],
  providers: [AuthLoginService],
  exports: [AuthLoginService], 
})
export class AuthLoginModule {}