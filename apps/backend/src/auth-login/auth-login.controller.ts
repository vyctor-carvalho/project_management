import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthLoginService } from './auth-login.service';
import { CreateAuthLoginDto } from './dto/create-auth-login.dto';
import { UpdateAuthLoginDto } from './dto/update-auth-login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthLoginController {
  constructor(private readonly authLoginService: AuthLoginService) {}

  @UseGuards(AuthGuard('local'))  
  @Post("login")
  async login(@Body() createAuthLoginDto: CreateAuthLoginDto) {
    const user = await this.authLoginService.validateUser(createAuthLoginDto.email, createAuthLoginDto.password);
    console.log(user);
    return this.authLoginService.login(user);
  }

  @UseGuards(AuthGuard('jwt-refresh')) 
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authLoginService.refresh(req.user);
  }

  @UseGuards(AuthGuard('jwt')) 
  @Post('logout')
  async logout(@Request() req) {
    return this.authLoginService.logout(req.user.id);
  }

}
