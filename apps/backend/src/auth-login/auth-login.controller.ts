import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthLoginService } from './auth-login.service';
import { CreateAuthLoginDto } from './dto/create-auth-login.dto';
import { UpdateAuthLoginDto } from './dto/update-auth-login.dto';

@Controller('auth-login')
export class AuthLoginController {
  constructor(private readonly authLoginService: AuthLoginService) {}

  @Post()
  create(@Body() createAuthLoginDto: CreateAuthLoginDto) {
    return this.authLoginService.create(createAuthLoginDto);
  }

  @Get()
  findAll() {
    return this.authLoginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authLoginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthLoginDto: UpdateAuthLoginDto) {
    return this.authLoginService.update(+id, updateAuthLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authLoginService.remove(+id);
  }
}
